// 引入组件
import { nextTick, createApp } from "vue";
import tooltip from './tooltip.vue'

// 清除监听
function clearEvent(el) {
    if (el._tipHandler) {
        el.removeEventListener('mouseenter', el._tipHandler)
    }
    if (el._tipMouseleaveHandler) {
        el.removeEventListener('mouseleave', el._tipMouseleaveHandler)
    }
    delete el._tipHandler
    delete el._tipMouseleaveHandler
    delete el._tipOptions
    delete el._tipInstance
}

function positionElement(el, target, placements) {
    let Placements = placements
    if (!el || !target) return;
    el.tooltipPostiton.left = 0;
    el.tooltipPostiton.top = 0;
    let el_dom
    let target_dom
    let tooltipArrow
    let ELDOM = el.$el.nodeType === 3 ? el.$el.nextElementSibling : el.$el;
    el_dom = ELDOM.getBoundingClientRect()
    target_dom = target.getBoundingClientRect()
    tooltipArrow = (ELDOM as HTMLDivElement).querySelector('.a-tooltip-arrow ')
    let top, left;
    switch (Placements) {
        case "top":
            if (target_dom.top < el_dom.height) {
                Placements = 'bottom'
            }
            break;
        case "bottom":
            if (target_dom.bottom < el_dom.height) {
                Placements = 'top'
            }
            break;
        case "left":
            if (target_dom.left < el_dom.width) {
                Placements = 'right'
            }
            break;
        case "right":
            if (target_dom.right < el_dom.width) {
                Placements = 'left'
            }
            break;
        default:
            throw new Error("Invalid direction");
    }

    tooltipArrow!.className = `a-tooltip-arrow ${Placements}`

    switch (Placements) {
        case "top":
            top = target_dom.top - ELDOM.offsetHeight - 10;
            left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2;
            break;
        case "bottom":
            top = target_dom.bottom + 10;
            left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2;
            break;
        case "left":
            top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2;
            left = target_dom.left - ELDOM.offsetWidth - 10;
            break;
        case "right":
            top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2;
            left = target_dom.right + 10;
            break;
        default:
            throw new Error("Invalid direction");
    }
    el.tooltipPostiton.top = top
    el.tooltipPostiton.left = left
}

// 方向
const allPlacements = ['bottom', 'left', 'right', 'top']

export const Tooltip = {
    install(app) {
        app.directive('tooltip', {
            mounted: Tooltip.mounted,
            updated: Tooltip.updated,
            unmounted: Tooltip.unmounted
        })
    },
    mounted(el, binding) {
        clearEvent(el)
        let timer: NodeJS.Timeout | null = null
        let isEnterTipDomRef = false;
        el._tipOptions = binding.value

        el._tipHandler = () => {
            if (timer !== null) {
                clearTimeout(timer)
                timer = null
            }
            const limitPlacementQueue = allPlacements.filter(placement => binding.modifiers[placement])
            const placements = limitPlacementQueue.length ? limitPlacementQueue : allPlacements
            if (!el._tipInstance) {
                el._synopsis = createApp(tooltip)
                el._root = document.createElement('div')
                document.body.appendChild(el._root)
                el._tipInstance = el._synopsis.mount(el._root)
            }
            el._tipInstance.placements = placements[0]
            el._tipInstance.showTip()
            if (typeof el._tipOptions === 'object') {
                el._tipInstance.text = el._tipOptions.text
                el._tipInstance.bgColor = el._tipOptions.bgColor || '#303133'
            } else {
                el._tipInstance.text = el._tipOptions
            }
            nextTick(() => {
                positionElement(el._tipInstance, el, placements[0])
            })
            el._scrollHandler = () => {
                if (el._tipInstance.tooltipShow)
                    positionElement(el._tipInstance, el, placements[0])
            }
            window.addEventListener('scroll', el._scrollHandler)
        }
        el._tipMouseleaveHandler = () => {
            if (el._tipInstance) {
                timer = setTimeout(() => {
                    el._tipInstance.hiddenTip()
                }, 300);
            }
        }
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', el._tipHandler)
            el._tipMouseleaveHandler()
        })
        el.addEventListener('mousedown', () => {
            document.addEventListener('mousemove', el._tipHandler)
        })
        el.addEventListener('mouseenter', el._tipHandler)
        el.addEventListener('mouseleave', () => {
            !isEnterTipDomRef && el._tipMouseleaveHandler()
        })
    },
    updated(el, binding) {
        el._tipOptions = binding.value
    },
    unmounted(el) {
        if (el._tipInstance) {
            el._synopsis.unmount()
            document.body.removeChild(el._root)
        }
        window.removeEventListener('scroll', el._scrollHandler)
    }
}
export default Tooltip
