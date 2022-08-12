import typescript from 'rollup-plugin-typescript2'
export default {
    // 入口
    input: './index.ts',
    // 出口
    output: [
        {
            file: '../dist/utils/index.js',
            // 配置打包模块化的方式 es:ESM  cjs:CommonJS
            format: 'es'
        }
    ],
    plugins: [
        typescript()
    ]
}