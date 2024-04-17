import { PropType, VNode, computed, defineComponent, reactive, toRefs } from 'vue'
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
    },
    setup(props, { emit }) {
        const state = reactive({
            data: props.data,
            columns: props.columns
        })

        const isKeyCoincident = (key: string | number) => {
            return !!(state.columns.find(c => c.key === key))
        }


        const operationTd = computed(() => {
            let isOperationTd = false;
            state.columns.forEach((item: any) => {
                if (item.key === "operation") {
                    isOperationTd = true;
                }
            });
            return isOperationTd;
        });

        const theadRender = () => (
            <thead class="a-table-thead">
                <tr class="a-table-tr">
                    {
                        state.columns.map(({ key, title, width }, _) => (
                            <th class="a-table-th" key={key} style={{ width: width ? typeof width === 'number' ? width + 'px' : width : 'auto' }}>
                                <div class="a-table-th_title-wrapper">
                                    <div class="a-table-th__title">{title}</div>
                                </div>
                            </th>
                        ))
                    }
                </tr>
            </thead>
        )

        const tbodyRender = () => (
            <tbody class="a-table-tbody">
                {
                    state.data.map(((item: any) => (
                        <tr class="a-table-tr">
                            {
                                state.columns.map(({ key, render }) => (
                                    <td data-col-key={key} class="a-table-td">
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
                <div class="a-table-wrapper">
                    <div class="a-scrollbar-container">
                        <table class="a-table-table">
                            {theadRender()}
                            {tbodyRender()}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
})