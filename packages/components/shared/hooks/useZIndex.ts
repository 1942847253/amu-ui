import { isDefined } from "../utils"

const useZIndex = () => { 
    let zIndex = 2000
    let ZIndexs = [] as number[]
    const popovers = document.querySelectorAll('.a-popover') as unknown as HTMLDivElement[]
    if (popovers.length > 0) {
        popovers.forEach(popover => {
            const ZIndex = Number(popover.style.zIndex)
            ZIndexs.push(ZIndex)
        })
        if (ZIndexs.length > 0) {
            zIndex = Math.max(...ZIndexs) + 1
        }
    }
    return zIndex
}

export default useZIndex