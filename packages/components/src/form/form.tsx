import { getStyleAttributeValue, uuid } from "../../shared/utils";
import { defineComponent, onMounted, provide, ref } from "vue";
import './style/index.less';
import $bus from "../../bus/bus";

export default defineComponent({
    name: 'AForm',
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
    emits: ['submit'],
    setup(props, { emit, slots, expose }) {
        const uniKey = uuid();
        const fromRef = ref<HTMLDivElement | null>(null);
        const model = JSON.parse(JSON.stringify(props.model));
        provide('model', model);
        provide('rules', props.rules);
        provide('uniKey', uniKey);
        onMounted(() => {
            initItemLabelWidth(); 
        })

        const initItemLabelWidth = () => {
            const allLabels = fromRef.value!.querySelectorAll('.a-form-item-label') as unknown as HTMLDivElement[]
            let labelWidth = 0;
            allLabels.forEach((label) => {
                const width = getStyleAttributeValue(label, 'width');
                width > labelWidth && (labelWidth = width)
            })
            allLabels.forEach((label) => {
                label.style.width = labelWidth + 'px';
            })

        }

        const validate = () => {
            return new Promise((resolve, reject) => {
                let isResolved = true;
                const VALIDATE_EVENT = `change-input-style-${uniKey}-`
                Object.keys(props.rules).forEach(key => {
                    for (let i = 0; i < props.rules[key].length; i++) {
                        const rule = props.rules[key][i]
                        const keyValue = props.model[key]
                        if (rule.required === true) {
                            if (keyValue === "") {
                                $bus.$emit(VALIDATE_EVENT + key, 'error', rule.message)
                                reject(rule.message)
                                isResolved = false
                                return
                            } else {
                                $bus.$emit(VALIDATE_EVENT + key)
                            }
                        }

                        if (rule.min || rule.max) {
                            if (keyValue.length < rule.min || keyValue.length > rule.max) {
                                $bus.$emit(VALIDATE_EVENT + key, 'error', rule.message)
                                reject(rule.message)
                                isResolved = false
                                return
                            } else {
                                $bus.$emit(VALIDATE_EVENT + key)
                            }
                        }

                        if (rule.validator && typeof rule.validator === 'function') {
                            rule.validator(rule, keyValue, (errorMessage: Error) => {
                                if (errorMessage) {
                                    $bus.$emit(VALIDATE_EVENT + key, 'error', errorMessage.message)
                                    reject(errorMessage.message);
                                    isResolved = false
                                    return
                                } else {
                                    $bus.$emit(VALIDATE_EVENT + key)
                                }
                            })
                        }
                    }
                })
                isResolved && resolve(isResolved)
            })
        }

        const resetFields = () => {
            const RESET_EVENT = `reset-input-value-${uniKey}-`
            Object.keys(props.model).forEach(key => {
                $bus.$emit(RESET_EVENT + key)
            })
        }

        expose({
            validate,
            resetFields
        })
        return () => (
            <div class="a-form-content" ref={fromRef}>
                {slots.default!()}
            </div>
        )
    }
})