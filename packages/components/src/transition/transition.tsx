import { defineComponent, Transition } from 'vue';
import './style/index.less';

export default defineComponent({
    name: 'ATransition',
    setup(props, { slots }) {
        return () => (
            <Transition name="a-transition-fade">
                {slots.default && slots.default()}
            </Transition>
        )
    }
})