const useElementPosition = (target: HTMLDivElement, popoverElement: HTMLElement, placement: string) => {
    let top = 0, left = 0;
    let Placements = placement
    if (!target) {
        return {
            placement: Placements,
            top,
            left
        }
    };
    const ELDOM = popoverElement;
    const target_dom = target.getBoundingClientRect()

    switch (Placements) {
        case "top":
            if (target_dom.top < ELDOM.clientHeight) {
                Placements = 'bottom'
            }
            break;
        case "bottom":
            if ((window.innerHeight - target_dom.bottom) < ELDOM.clientHeight) {
                Placements = 'top'
            }
            break;
        case "left":
            if (target_dom.left < ELDOM.clientWidth) {
                Placements = 'right'
            }
            break;
        case "right":
            if ((window.innerWidth - target_dom.right) < ELDOM.clientWidth) {
                Placements = 'left'
            }
            break;
        default:
            Placements = placement
    }
    switch (Placements) {
        case "top":
            top = target_dom.top - ELDOM.offsetHeight - 5;
            left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2;
            break;
        case "bottom":
            top = target_dom.bottom + 5;
            left = target_dom.left + (target_dom.width - ELDOM.offsetWidth) / 2;
            break;
        case "left":
            top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2;
            left = target_dom.left - ELDOM.offsetWidth - 5;
            break;
        case "right":
            top = target_dom.top + (target_dom.height - ELDOM.offsetHeight) / 2;
            left = target_dom.right + 5;
            break;
        default:
            left = 0
            top = 0
    }
    return {
        placement: Placements,
        top,
        left
    }
}

export default useElementPosition