<template>
    <div class="amu-upload">
        <upload-dragger
            v-if="drag"
            :disabled="disabled"
            @file="onDragFiles"
            @click="handleClick"
            @keydown.enter="handleClick"
            tabindex="0"
        >
            <slot />
        </upload-dragger>
        <template v-else>
            <div
                v-if="!showTriggerInList"
                class="amu-upload__trigger"
                @click="handleClick"
                @keydown.enter="handleClick"
                tabindex="0"
            >
                <slot v-if="$slots.default" />
                <amu-button v-else :disabled="disabled" type="primary">
                    <template #icon><icon-upload-cloud /></template>
                    点击上传
                </amu-button>
            </div>
        </template>

        <input
            ref="inputRef"
            class="amu-upload__input"
            type="file"
            :name="name"
            :multiple="multiple"
            :accept="accept"
            :disabled="disabled"
            @change="handleInputChange"
            @click.stop
        />

        <div style="margin-top: 5px;">
            <slot name="tip" />
        </div>

        <upload-list
            v-if="showFileList"
            :files="uploadFiles"
            :list-type="listType"
            :disabled="disabled"
            @remove="handleRemove"
            @preview="handlePreview"
        >
            <template v-if="$slots.file" #file="{ file }">
                <slot name="file" :file="file" />
            </template>
            <template v-if="showTriggerInList" #append>
                <div
                    class="amu-upload__trigger-card"
                    :class="{ 'is-disabled': disabled }"
                    @click="handleClick"
                    @keydown.enter="handleClick"
                    tabindex="0"
                >
                    <amu-icon :size="20">
                        <icon-plus />
                    </amu-icon>
                    <div class="amu-upload__trigger-text">上传</div>
                </div>
            </template>
        </upload-list>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, shallowRef, computed } from 'vue'
import { uploadProps, uploadEmits } from './props'
import { AmuButton } from '../../button'
import { AmuIcon } from '../../icon'
import { previewImage } from '../../image-viewer'
import { IconUploadCloud, IconPlus } from '@amu-ui/icons'
import UploadList from './upload-list.vue'
import UploadDragger from './upload-dragger.vue'
import ajax from './ajax'
import type { UploadFile, UploadRawFile, UploadRequestOptions } from './types'

defineOptions({
  name: 'AmuUpload'
})

const props = defineProps(uploadProps)
const emit = defineEmits(uploadEmits)

const inputRef = shallowRef<HTMLInputElement>()
const uploadFiles = ref<UploadFile[]>([])

const reqs: Record<number, XMLHttpRequest | Promise<any> | undefined> = {}

const isPictureType = computed(() => props.listType === 'picture' || props.listType === 'picture-card')
const showTriggerInList = computed(() => props.listType === 'picture-card' && props.showFileList)

const genFileId = () => Date.now() + Math.random()

const normalizeFile = (file: UploadFile): UploadFile => {
    const uid = file.uid ?? genFileId()
    const status = file.status ?? (file.url ? 'success' : 'ready')
    return {
        ...file,
        uid,
        status
    }
}

const updateFileList = (files: UploadFile[], triggerFile?: UploadFile) => {
    uploadFiles.value = files
    emit('update:fileList', files)
    if (triggerFile) {
        emit('change', triggerFile, files)
    }
}

watch(() => props.fileList, (val) => {
    uploadFiles.value = val.map(normalizeFile)
}, { immediate: true, deep: true })

const handleClick = () => {
    if (props.disabled) return
    if (!inputRef.value) return
    inputRef.value.value = ''
    inputRef.value.click()
}

const handleInputChange = (e: Event) => {
    if (props.disabled) return
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!files) return
    uploadRawFiles(Array.from(files))
}

const onDragFiles = (files: File[]) => {
    if (props.disabled) return
    uploadRawFiles(files)
}

const isAccepted = (rawFile: UploadRawFile) => {
    if (!props.accept) return true
    const acceptList = props.accept.split(',').map(item => item.trim()).filter(Boolean)
    if (!acceptList.length) return true
    const fileType = rawFile.type
    const fileName = rawFile.name.toLowerCase()
    return acceptList.some((accept) => {
        if (accept.startsWith('.')) {
            return fileName.endsWith(accept.toLowerCase())
        }
        if (accept.endsWith('/*')) {
            const baseType = accept.replace('/*', '')
            return fileType.startsWith(`${baseType}/`)
        }
        return fileType === accept
    })
}

const uploadRawFiles = (files: File[]) => {
    if (props.limit && uploadFiles.value.length + files.length > props.limit) {
        emit('exceed', files, uploadFiles.value)
        return
    }

    if (!props.multiple) {
        files = files.slice(0, 1)
    }

    for (const file of files) {
        const rawFile = file as UploadRawFile
        if (!isAccepted(rawFile)) {
            continue
        }
        rawFile.uid = genFileId()
        const uploadFile = handleStart(rawFile)
        if (props.autoUpload) {
            upload(rawFile, uploadFile)
        }
    }
}

const handleStart = (rawFile: UploadRawFile) => {
    const uploadFile = normalizeFile({
        name: rawFile.name,
        percentage: 0,
        status: 'ready',
        size: rawFile.size,
        raw: rawFile,
        uid: rawFile.uid
    })

    if (isPictureType.value && !uploadFile.url) {
        try {
            uploadFile.url = URL.createObjectURL(rawFile)
        } catch (err) {
            console.error(err)
        }
    }

    const newFiles = [...uploadFiles.value, uploadFile]
    updateFileList(newFiles, uploadFile)
    return uploadFile
}

const removeFile = (file: UploadFile, emitRemove = true) => {
    const newFiles = uploadFiles.value.filter(item => item.uid !== file.uid)
    if (file.url && file.url.startsWith('blob:')) {
        URL.revokeObjectURL(file.url)
    }
    updateFileList(newFiles, file)
    if (emitRemove) {
        emit('remove', file, newFiles)
    }
}

const handleRemove = async (file: UploadFile) => {
    if (props.disabled) return
    if (props.beforeRemove) {
        const canRemove = await props.beforeRemove(file, uploadFiles.value)
        if (canRemove === false) return
    }

    abort(file)
    removeFile(file)
}

const handlePreview = (file: UploadFile) => {
    if (props.disabled) return
    emit('preview', file)

    if (!isPictureType.value || !file.url || !isImageFile(file)) return

    const urlList = uploadFiles.value
        .filter(item => item.url && isImageFile(item))
        .map(item => item.url as string)
    if (!urlList.length) return
    const currentIndex = Math.max(0, urlList.findIndex(url => url === file.url))
    previewImage({
        urlList,
        initialIndex: currentIndex
    })
}

const isImageFile = (file: UploadFile) => {
    if (file.raw?.type) {
        return file.raw.type.startsWith('image/')
    }
    const lowerName = file.name.toLowerCase()
    return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'].some(ext => lowerName.endsWith(ext))
}

const abort = (file?: UploadFile) => {
    if (file) {
        if (file.uid && reqs[file.uid]) {
            const req = reqs[file.uid] as any
            if (req.abort) {
                req.abort()
            }
            delete reqs[file.uid]
        }
    } else {
        Object.keys(reqs).forEach(uid => {
            if (reqs[Number(uid)]) {
                (reqs[Number(uid)] as any).abort?.()
                delete reqs[Number(uid)]
            }
        })
    }
}

const upload = async (rawFile: UploadRawFile, file?: UploadFile) => {
    if (!props.beforeUpload) {
        return post(rawFile, file)
    }

    let hookResult: any
    try {
        hookResult = await props.beforeUpload(rawFile)
    } catch (err) {
        hookResult = false
    }

    if (hookResult === false) {
        const target = file || uploadFiles.value.find(f => f.uid === rawFile.uid)
        if (target) {
            removeFile(target, false)
        }
        return
    }

    post(rawFile, file)
}

const post = (rawFile: UploadRawFile, uploadFile?: UploadFile) => {
    const uid = rawFile.uid
    const file = uploadFile || uploadFiles.value.find(f => f.uid === uid)
    if (!file) return

    if (!props.action && !props.httpRequest) {
        const err = new Error('缺少上传地址')
        file.status = 'fail'
        emit('error', err, file, uploadFiles.value)
        emit('change', file, uploadFiles.value)
        return
    }

    file.status = 'uploading'
    file.percentage = 0

    const option: UploadRequestOptions = {
        headers: props.headers,
        withCredentials: props.withCredentials,
        file: rawFile,
        data: props.data,
        method: props.method,
        filename: props.name,
        action: props.action,
        onProgress: (evt) => {
            file.percentage = evt.percent
            file.status = 'uploading'
            emit('progress', evt, file, uploadFiles.value)
        },
        onSuccess: (res) => {
            file.status = 'success'
            file.response = res
            delete reqs[uid]
            emit('success', res, file, uploadFiles.value)
            emit('change', file, uploadFiles.value)
        },
        onError: (err) => {
            file.status = 'fail'
            delete reqs[uid]
            emit('error', err, file, uploadFiles.value)
            emit('change', file, uploadFiles.value)
        }
    }

    const req = props.httpRequest ? props.httpRequest(option) : ajax(option)
    if (!req) {
        const err = new Error('上传失败')
        option.onError(err as any)
        return
    }

    reqs[uid] = req
    if (req instanceof Promise) {
        req.then(option.onSuccess, option.onError)
    }
}

const submit = () => {
    uploadFiles.value
        .filter(file => file.status === 'ready')
        .forEach(file => upload(file.raw!, file))
}

const clearFiles = () => {
    abort()
    uploadFiles.value.forEach((file) => {
        if (file.url && file.url.startsWith('blob:')) {
            URL.revokeObjectURL(file.url)
        }
    })
    uploadFiles.value = []
    emit('update:fileList', [])
}

defineExpose({
    abort,
    submit,
    clearFiles,
    handleStart,
    handleRemove
})
</script>
