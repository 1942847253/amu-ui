export default {
    mounted(el) {
        let onSelectorInput = el.querySelector('.selector-input');
        let onSelectorMenu = el.querySelector('.selector-menu');

        const onInput = onSelectorInput.querySelector('.input');
        const onPlaceholder = onSelectorInput.querySelector('label');
        const onIconfont = onSelectorInput.querySelector('span');

        const readOnly = onInput.readOnly

        const menuHide = () => {
            onSelectorMenu.style.display = 'none';
            onIconfont.className = 'iconfont icon-xiangxia';
            onIconfont.style.transform = '';
            onInput.value.length === 0 && (onPlaceholder.style.display = 'block');
        }

        const menuShow = () => {
            onSelectorMenu.style.display = 'block';
            readOnly && (onIconfont.style.transform = 'rotate(-180deg)');
            onPlaceholder.style.display = 'none';
            onIconfont.className = `iconfont ${readOnly ? 'icon-xiangxia' : "icon-sousuo"}`;
        }

        onInput.addEventListener('focus', () => {
            menuShow();
        }, false);

        onInput.addEventListener('blur', () => {
            setTimeout(() => {
                menuHide();
            }, 200);
        }, false);

        onSelectorMenu.addEventListener('click', (e) => {
            setTimeout(() => {
                onInput.focus()
                menuShow()
            }, 100);
        })
    }
}