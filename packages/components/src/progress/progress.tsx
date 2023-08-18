import { defineComponent } from "vue";
import './style/index.less'

export default defineComponent({
    name: 'AProgress',
    props: {},
    emits: [],
    setup(props, { emit }) {
        return () => (
            <div class="a-progress-content">
                <div class="a-progress-runway" >
                    <div class="a-progress-bar"></div>
                </div>
            </div>
        )
    }
})