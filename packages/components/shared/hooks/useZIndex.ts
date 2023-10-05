import { isDefined } from "../utils"

const useZIndex = () => {
    let ZIndex = 2000
    if (isDefined(window.$?.amuui?.zIndex)) {
        ZIndex = window.$.amuui.zIndex + 1
    } else {
        window.$ = { amuui: {} }
        window.$.amuui.zIndex = ZIndex
    }

    function setZIndex(index: number) {
        window.$.amuui.zIndex = index
    }

    return {
        ZIndex,
        setZIndex
    }
}

export default useZIndex