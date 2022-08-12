const exec = require('child_process').exec
const resolve = require('path').resolve
const rmdir = require(resolve(__dirname, '../../components/build/utils/rmdir'))
const fs = require('fs')
//没有dist文件夹则创建
if (!fs.existsSync(resolve(__dirname, '../../dist'))) {
    fs.mkdirSync(resolve(__dirname, '../../dist'))
    console.log('success','dist文件创建成功')
}
//清除原有utils下的文件
rmdir(resolve(__dirname, '../../dist/utils'))

//将组件utils的package.json复制到需要发布的文件下
fs.readFile(resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
    if (err) {
        console.log(err)
        return
    }
    fs.writeFileSync(resolve(__dirname, '../../dist/utils/package.json'), data);
    console.log('package.json复制成功')
})

exec('rollup -c', function (error) {
    if (error) {
        console.error('error: ' + error);
        return;
    }
});