import { getStyleAttributeValue } from "../../shared/utils";
import { defineComponent, onMounted, provide, reactive, ref } from "vue";
import './index.scss';

export default defineComponent({
    name: 'YForm',
    props: {
        model: {
            type: Object,
            default: {}
        },
        rules: {
            type: Object,
            default: {}
        },
    },
    emits: [],
    setup(props, { emit, slots }) {
        const fromRef = ref<HTMLDivElement | null>(null);
        const model = ref(props.model);
        provide('model', props.model);
        provide('rules', props.rules);

        onMounted(() => {
            initItemLabelWidth();
        })

        const initItemLabelWidth = () => {
            const allLabels = fromRef.value!.querySelectorAll('.y-form-item-label') as unknown as HTMLDivElement[]
            const allLabelsWidthArr: number[] = [];
            allLabels.forEach((label) => {
                console.log(label);
                
                allLabelsWidthArr.push(getStyleAttributeValue(label, 'width'))
            })
            allLabels.forEach((label) => {
                label.style.width = Math.max(...allLabelsWidthArr) + 'px'
            })
        }


        return () => (
            <div class="y-form-content" ref={fromRef}>
                {slots.default!()}
            </div>
        )
    }
})