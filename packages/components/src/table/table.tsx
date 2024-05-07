import { PropType, VNode, VNodeRef, computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'
import './style/index.less';
import { AIcon, AScrollbar } from '..';

export type ATableColumns = {
    title: string | number;
    key: string | number;
    width?: string | number
    render?: (row: any) => VNode
}

export default defineComponent({
    name: 'ATable',
    emits: [],
    props: {
        columns: {
            type: Array as PropType<ATableColumns[]>,
            default: () => [],
        },
        data: {
            type: Array as any,
            default: () => [],
        },
        maxHeight: {
            type: String,
            default: () => '100%'
        },
        bordered: {
            type: Boolean,
            default: true
        },
        singleLine: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit }) {
        const tableContainerRef = ref<HTMLDivElement | null>(null)
        const state = reactive({
            data: props.data as any[],
            columns: props.columns,
            gutterWidth: 15
        })

        watch([() => props.columns, () => props.data], ([columns, data]) => {
            state.columns = columns
            state.data = data
        })

        const isEmpty = computed(() => state.data.length === 0)

        onMounted(() => {
            // getScrollbarWidth(tableContainerRef.value!)
            // window.addEventListener('resize', () => getScrollbarWidth(tableContainerRef.value!))
        })

        function getScrollbarWidth(div: HTMLDivElement) {
            // if (!tableContainerRef.value) return
            // state.gutterWidth = div.offsetWidth - div.clientWidth
        }

        const theadRender = () => (
            <thead class="a-table-thead">
                <tr class="a-table-tr">
                    {
                        state.columns.map(({ key, title, width }, _) => (
                            <th class={['a-table-th', !props.singleLine ? 'single-line' : '']} key={key} style={{ width: width ? width + 'px' : 'auto' }}>
                                <div class="a-table-th_title-wrapper">
                                    <div class="a-table-th__title">{title}</div>
                                </div>
                            </th>

                        ))

                    }
                    {/* {state.gutterWidth > 0 && <th class="gutter" style={{ width: state.gutterWidth + 'px' }}></th>} */}
                </tr>
            </thead >
        )

        const tbodyRender = () => {
            const classes = [
                'a-table-td',
                !props.singleLine ? 'single-line' : '',
            ]
            const style = (Width: string | number) => {
                return {
                    width: Width ? Width + 'px' : 'auto',
                    '--a-table-tr-bottom': props.bordered ? 'none' : '1px solid var(--a-border-weak-color)'
                }
            }
            return (
                <tbody class="a-table-tbody">
                    {
                        state.data.map(((item: any) => (
                            <tr class="a-table-tr">
                                {
                                    state.columns.map(({ key, render, width }) => (
                                        <td data-col-key={key} class={classes} style={style(width!)}>
                                            {render ? render(item) : item[key]}
                                        </td>
                                    ))
                                }
                            </tr>
                        )))
                    }
                </tbody>
            )
        }

        const emptyWrapperRender = () => {
            const style = {
                fontSize: '50px',
                color: 'var(--a-text-disable-color)'
            }
            return (
                <div class="a-table-empty_wrapper">
                    <AIcon name="data-view" style={style} />
                    <div class="text">无数据</div>
                </div>
            )
        }

        return () => (
            <div class="a-table" style={{ border: props.bordered ? '1px solid var(--a-border-weak-color)' : 'none' }}>
                <table class="table">
                    {theadRender()}
                </table>
                {
                    isEmpty.value ? emptyWrapperRender() : (
                        <AScrollbar style={{ maxHeight: props.maxHeight }}>
                            <div class="a-table--body-wrapper" ref={tableContainerRef}>
                                <table class="table" >
                                    {tbodyRender()}
                                </table>
                            </div>
                        </AScrollbar>
                    )
                }
            </div>
        )
    }
})