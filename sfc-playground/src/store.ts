import { reactive, watchEffect, version } from 'vue'
import * as defaultCompiler from 'vue/compiler-sfc'
import type { Store, SFCOptions, StoreState, OutputModes } from '@vue/repl'
import { compileFile, File } from '@vue/repl'
import { utoa, atou } from './utils/encode'
import {
  defaultMainFile,
  getVueRuntimeURL,
  getVueCompilerURL,
  amuInjectPlugin,
  additionalImports,
  additionalFiles,
  defaultDeleteTips,
  welcomeCode,
  appFile,
  AppWrapperCode
} from './config'

import { convertBugImportMapCdnUrl } from './helpers'

export interface StoreOptions {
  serializedState?: string
  showOutput?: boolean
  // loose type to allow getting from the URL without inducing a typing error
  outputMode?: OutputModes | string
  defaultVueRuntimeURL?: string
  defaultVueServerRendererURL?: string
}

export class ReplStore implements Store {
  state: StoreState

  compiler = defaultCompiler

  options?: SFCOptions

  initialShowOutput: boolean

  initialOutputMode: OutputModes = 'preview'

  private readonly defaultVueRuntimeURL: string
  private defaultVueServerRendererURL: string
  private pendingCompiler: Promise<any> | null = null

  constructor({
    serializedState = '',
    defaultVueRuntimeURL = getVueRuntimeURL(version),
    defaultVueServerRendererURL = `https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js`,
    showOutput = false,
    outputMode = 'preview'
  }: StoreOptions) {
    let files: StoreState['files'] = {}

    if (serializedState) {
      const saved = JSON.parse(atou(serializedState))
      files[defaultMainFile] = new File(defaultMainFile, AppWrapperCode)
      // eslint-disable-next-line no-restricted-syntax
      for (const filename of Object.keys(saved)) {
        let codeContent = saved[filename]
        // fix some error cdn url
        if (filename === 'import-map.json') {

          const json = JSON.parse(codeContent)
          convertBugImportMapCdnUrl(json.imports)
          codeContent = JSON.stringify(json, null, 2)
        }
        files[filename] = new File(filename, codeContent)
      }
    } else {

      files = {
        [defaultMainFile]: new File(defaultMainFile, AppWrapperCode),
        [appFile]: new File(appFile, welcomeCode),
      }
    }

    if (!files[appFile]) {
      files[appFile] = new File(appFile, welcomeCode)
    }

    this.defaultVueRuntimeURL = defaultVueRuntimeURL
    this.defaultVueServerRendererURL = defaultVueServerRendererURL
    this.initialShowOutput = showOutput
    this.initialOutputMode = outputMode as OutputModes

    this.state = reactive({
      mainFile: defaultMainFile,
      files,
      activeFile: files[appFile],
      errors: [],
      vueRuntimeURL: this.defaultVueRuntimeURL,
      vueServerRendererURL: this.defaultVueServerRendererURL
    })

    this.initImportMap()
  }

  // don't start compiling until the options are set
  init() {
    watchEffect(() => compileFile(this, this.state.activeFile))

    for (const file in this.state.files) {
      if (file !== appFile) {
        compileFile(this, this.state.files[file])
      }
    }
  }

  setActive(filename: string) {
    this.state.activeFile = this.state.files[filename]
  }

  addFile(fileOrFilename: string | File) {
    const file = typeof fileOrFilename === 'string' ? new File(fileOrFilename) : fileOrFilename
    this.state.files[file.filename] = file
    if (!file.hidden) this.setActive(file.filename)
  }

  deleteFile(filename: string) {

    for (const file of additionalFiles) {
      if (filename === file.filename && file.canDelete === false) {
        alert(file.deleteTips || defaultDeleteTips)
        return
      }
    }
    // if (confirm(`Are you sure you want to delete ${filename}?`)) {
    //   if (this.state.activeFile.filename === filename) {
    //     this.state.activeFile = this.state.files[this.state.mainFile]
    //   }
    //   delete this.state.files[filename]
    // }
  }

  serialize() {
    return '#' + utoa(JSON.stringify(this.getFiles()))
  }

  getFiles() {
    const exported: Record<string, string> = {}
    for (const filename in this.state.files) {
      exported[filename] = this.state.files[filename].code
    }
    return exported
  }

  async setFiles(newFiles: Record<string, string>, mainFile = defaultMainFile) {
    const files: Record<string, File> = {}
    if (mainFile === defaultMainFile && !newFiles[mainFile]) {
      files[mainFile] = new File(mainFile, welcomeCode)
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const [filename, file] of Object.entries(newFiles)) {
      files[filename] = new File(filename, file)
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const file of Object.values(files)) {
      await compileFile(this, file)
    }
    this.state.mainFile = mainFile
    this.state.files = files
    this.initImportMap()
    this.setActive(mainFile)
  }

  private initImportMap() {
    const map = this.state.files['import-map.json']
    if (!map) {
      this.state.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(
          {
            imports: {
              vue: this.defaultVueRuntimeURL,
              ...additionalImports
            }
          },
          null,
          2
        )
      )
    } else {
      try {
        const json = JSON.parse(map.code)
        convertBugImportMapCdnUrl(json.imports)

        if (!json.imports.vue) {
          json.imports.vue = this.defaultVueRuntimeURL
          map.code = JSON.stringify(json, null, 2)
        }
      } catch (e) { }
    }

    // additionalFiles inject
    additionalFiles.forEach(file => {
      const { filename, code, hidden } = file
      this.state.files[filename] = new File(amuInjectPlugin, code)
      this.state.files[filename].hidden = !!hidden
    })
  }

  getImportMap() {
    try {
      const codeJson = JSON.parse(this.state.files['import-map.json'].code)
      convertBugImportMapCdnUrl(codeJson.imports)
      return codeJson
    } catch (e) {
      this.state.errors = [`Syntax error in import-map.json: ${(e as Error).message}`]
      return {}
    }
  }

  setImportMap(map: {
    imports: Record<string, string>
    scopes?: Record<string, Record<string, string>>
  }) {
    this.state.files['import-map.json'].code = JSON.stringify(map, null, 2)
  }

  async setVueVersion(version: string) {
    const compilerUrl = getVueCompilerURL(version)
    const runtimeUrl = getVueRuntimeURL(version)
    this.pendingCompiler = import(/* @vite-ignore */ compilerUrl)
    this.compiler = await this.pendingCompiler
    this.pendingCompiler = null
    this.state.vueRuntimeURL = runtimeUrl
    const importMap = this.getImportMap()
      ; (importMap.imports || (importMap.imports = {})).vue = runtimeUrl
    this.setImportMap(importMap)
    console.info(`[@vue/repl] Now using Vue version: ${version}`)
  }

  resetVueVersion() {
    this.compiler = defaultCompiler
    this.state.vueRuntimeURL = this.defaultVueRuntimeURL
  }
}
