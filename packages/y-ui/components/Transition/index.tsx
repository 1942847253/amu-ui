import { defineComponent, Transition } from 'vue';
import './index.scss';

export default defineComponent({
    name: 'YTransition',
    setup(props, { slots }) {
        return () => (
            <Transition name="y-transition-fade">
                {slots.default && slots.default()}
            </Transition>
        )
    }
})