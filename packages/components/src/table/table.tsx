import { PropType, defineComponent, reactive, toRefs } from 'vue'
import './style/index.less';

export type ATableColumns = {
    title: string | number;
    key: string | number
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

        const theadRender = () => (
            <thead class="a-table-thead">
                <tr class="a-table-tr">
                    {
                        state.columns.map((item, _) => (
                            <th class="a-table-th" key={item.key}>
                                <div class="a-table-th_title-wrapper">
                                    <div class="a-table-th__title">{item.title}</div>
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
                    state.data.map(((item: never) => (
                        <tr class="a-table-tr">
                            {
                                Object.keys(item).map((key => (
                                    <td data-col-key={key} class="a-table-td">
                                        {item[key]}
                                    </td>
                                )))
                            }
                            <td class="a-table-td_last">
                                123
                            </td>
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