import $bus from '../../bus/bus';
import { defineComponent, onMounted, ref, inject, watch } from 'vue'
import { EAction, EventName } from '../collapse/collapse';
import './style/index.less';
export default defineComponent({
    name: 'ACollapseItem',
    props: {
        title: {
            type: String,
            default: ""
        },
        name: {
            type: String,
        },
        currentName: String
    },
    emits: [],
    setup(props, { slots }) {
        let iconDom: HTMLDivElement;
        const modelValue = inject('model-value')
        const collapseHeadRef = ref<null | HTMLDivElement>(null);
        const collapseContentRef = ref<null | HTMLDivElement>(null);
        const mainHeight = ref<number>(0);

        onMounted(() => {
            mainHeight.value = collapseContentRef.value!.offsetHeight
            iconDom = collapseHeadRef.value!.querySelector('.a-collapse-item-head-icon')!;
            collapseContentRef.value!.style.height = 0 + 'px'
            if (Array.isArray(modelValue)) {
                const shouldShow = modelValue.includes(props.name);
                shouldShow && openContent();
            } else {
                const shouldShow = modelValue && modelValue === props.name
                shouldShow && openContent();
            }
        })

        watch(() => props.currentName, (name) => {
            name !== props.name && closeContent()
        })

        const clickHead = () => {
            const contentHeight = Number(collapseContentRef.value!.style.height.split('p')[0])
            if (contentHeight === 0) {
                openContent();
                $bus.$emit(EventName.UPDATE_MODEL_VALUE, EAction.OPEN, props.name)
            } else {
                closeContent();
                $bus.$emit(EventName.UPDATE_MODEL_VALUE, EAction.CLOSE, props.name)
            }
        }

        const openContent = () => {
            collapseContentRef.value!.style.borderBottom = '1px solid #ebeef5'
            collapseHeadRef.value!.style.borderBottom = 'none'
            collapseContentRef.value!.style.height = mainHeight.value + 'px'
            iconDom.style.transform = 'rotate(90deg)'
        }

        const closeContent = () => {
            iconDom.style.transform = 'rotate(0deg)'
            collapseContentRef.value!.style.height = '0px'
            setTimeout(() => {
                collapseHeadRef.value!.style.borderBottom = '1px solid #ebeef5'
                collapseContentRef.value!.style.borderBottom = 'none'
            }, 300);
        }

        return () => (
            <>
                <div class="a-collapse-item">
                    <div ref={collapseHeadRef} onClick={() => clickHead()} class="a-collapse-item-head">
                        <div class="a-collapse-item-head-title">{props.title}</div>
                        <div class="a-collapse-item-head-icon iconfont icon-right"></div>
                    </div>
                    <div ref={collapseContentRef} class="a-collapse-item-content">
                        {slots.default ? slots.default() : ''}
                        <div style="height:15px"></div>
                    </div>
                </div >
            </>
        )
    }
})
