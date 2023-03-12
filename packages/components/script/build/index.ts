import delPath from "../utils/delpath";
import { series, parallel, src, dest } from "gulp";
import { pkgPath, componentPath } from "../utils/paths";
import less from "gulp-less";
import autoprefixer from "gulp-autoprefixer";
import run from "../utils/run";
//删除dist

export const removeDist = () => {
  return delPath(`${pkgPath}/amu-ui`);
};

//打包样式
export const buildStyle = () => {
   console.log("test" + componentPath);

  return src(`${componentPath}/src/**/style/**.less`)
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(dest(`${pkgPath}/amu-ui/lib/src`))
    .pipe(dest(`${pkgPath}/amu-ui/es/src`));
};

//打包组件
export const buildComponent = async () => {
  console.log('test'+componentPath);

  run("pnpm run build", componentPath);
};

export default series(
  async () => removeDist(),
  parallel(
    async () => buildStyle(),
    async () => buildComponent()
  )
);
