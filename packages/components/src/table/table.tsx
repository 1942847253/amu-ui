import { PropType, VNode, VNodeRef, computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import './style/index.less';

export type ATableColumns = {
    title: string | number;
    key: string | number;
    width: string | number
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
        }
    },
    setup(props, { emit }) {
        const tableContainerRef = ref<HTMLDivElement | null>(null)
        const state = reactive({
            data: props.data,
            columns: props.columns,
            gutterWidth: 15
        })

        onMounted(() => {
            getScrollbarWidth(tableContainerRef.value!)
            window.addEventListener('resize', () => getScrollbarWidth(tableContainerRef.value!))
        })

        function getScrollbarWidth(div: HTMLDivElement) {
            state.gutterWidth = div.offsetWidth - div.clientWidth
        }

        const theadRender = () => (
            <thead class="a-table-thead">
                <tr class="a-table-tr">
                    {
                        state.columns.map(({ key, title, width }, _) => (
                            <th class="a-table-th" key={key} style={{ width: width ? width + 'px' : 'auto' }}>
                                <div class="a-table-th_title-wrapper">
                                    <div class="a-table-th__title">{title}</div>
                                </div>
                            </th>

                        ))

                    }
                    <th class="gutter" style={{ width: state.gutterWidth + 'px' }}></th>
                </tr>
            </thead >
        )

        const tbodyRender = () => (
            <tbody class="a-table-tbody">
                {
                    state.data.map(((item: any) => (
                        <tr class="a-table-tr">
                            {
                                state.columns.map(({ key, render,width }) => (
                                    <td data-col-key={key} class="a-table-td" style={{ width: width ? width + 'px' : 'auto' }}>
                                        {render ? render(item) : item[key]}
                                    </td>
                                ))
                            }
                        </tr>
                    )))
                }
            </tbody>
        )

        return () => (
            <div class="a-table">
                <table class="table">
                    {
                        theadRender()
                    }
                </table>
                <div class="a-table--body-wrapper" style={{ maxHeight: props.maxHeight }} ref={tableContainerRef}>
                    <table class="table" >
                        {tbodyRender()}
                    </table>
                </div>
            </div>
        )
    }
})