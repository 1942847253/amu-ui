import { computed, defineComponent, reactive, ref, watch } from "vue";
import { AInput } from "../input";
import './style/index.less';

interface IOmit {
    omit: boolean;
    value: string;
    type: 'prev' | 'next';
}

export default defineComponent({
    name: "APagination",
    props: {
        total: { type: [Number, String], default: 0 }, // 总数 The total number of
        currentPage: { type: [Number, String], default: 1 }, // 当前页数 The current number of pages
        pageSize: { type: [Number, String], default: () => 10 }, // 每页显示条数 Size of entries per page
        sizesList: { type: Array, default: () => [10, 20, 50, 100] }, // 每页显示条数的选项设置 Option setting to display number of entries per page
        background: { type: Boolean, default: false }
    },
    emits: ["page-change", "size-change"],
    setup(props, { emit, slots },) {
        const pageList = ref<(number | IOmit)[]>([])
        const totalPage = computed(() => Math.ceil(Number(props.total) / Number(props.pageSize)))
        const around = ref(2)

        const makePage = (total: number, cur: number, around: number) => {
            let result = [];
            let baseCount = around * 2 + 1 + 2 + 2 + 2; //总共元素个数
            let surplus = baseCount - 4; //只出现一个省略号 剩余元素个数
            let startPosition = 1 + 2 + around + 1;//前面出现省略号的临界点
            let endPosition = total - 2 - around - 1;//后面出现省略号的临界点
            const prevOmit: IOmit = { omit: true, value: '...', type: 'prev' }
            const nextOmit: IOmit = { omit: true, value: '...', type: 'next' }
            if (total <= baseCount - 2) { //全部显示 不出现省略号
                result = Array.from({ length: total }, (v, i) => i + 1);
            } else { //需要出现省略号
                if (cur < startPosition) { //1.只有后面出现省略号
                    result = [...Array.from({ length: surplus }, (v, i) => i + 1), nextOmit, total]
                } else if (cur > endPosition) { //2.只有前边出现省略号
                    result = [1, prevOmit, ...Array.from({ length: surplus }, (v, i) => total - surplus + i + 1)]
                } else { //3.两边都有省略号
                    result = [1, prevOmit, ...Array.from({ length: around * 2 + 1 }, (v, i) => cur - around + i), nextOmit, total]
                }
            }
            return result
        }

        const initPageList = () => {
            pageList.value = makePage(totalPage.value, Number(props.currentPage), around.value)
        }

        initPageList()

        watch(() => props.currentPage, () => {
            initPageList()
        })

        const paginationItemClass = computed(() => {
            return (item: number | IOmit) => {
                let str = 'btn pagination-item'
                if (props.background) {
                    str += " background"
                }
                if (Number(props.currentPage) === item) {
                    str += ` ${props.background ? "background-current" : "current"}`
                }
                return str
            }
        })

        const changeCurrentPage = (item: number | IOmit) => {
            if (typeof item === 'number') {
                emit('page-change', item)
            } else if (typeof item === 'object') {
                const baseCount = (around.value * 2) + 1
                if (item.type === "prev") {
                    emit('page-change', Number(props.currentPage) - baseCount)
                } else {
                    emit('page-change', Number(props.currentPage) + baseCount)
                }
            }
        }

        const prevNextPageActions = (falg: 'prev' | 'next') => {
            let currentPage = props.currentPage
            if (falg === 'prev') {
                if (props.currentPage === 1) {
                    return
                };
                emit('page-change', Number(currentPage) - 1)
            } else {
                if (props.currentPage === pageList.value[pageList.value.length - 1]) return;
                emit('page-change', Number(currentPage) + 1)
            }
        }

        const disableBtnClass = computed(() => {
            return (flag: 'prev' | 'next') => {
                let classStr = ''
                if (flag === 'prev') {
                    if (props.currentPage === 1) {
                        classStr = 'disable'
                    }
                } else {
                    if (props.currentPage === pageList.value[pageList.value.length - 1]) {
                        classStr = 'disable'
                    }
                }

                return classStr
            }
        })

        const omitBtnRender = (item: number | IOmit) => {
            if (typeof item === 'number') {
                return item
            } else {
                return <span class="iconfont icon-shenglvehao"></span>
            }
        }

        const changeomitBtnClass = (e: Event, flag: 'enter' | 'leave', item: IOmit | number) => {
            const Item = item as IOmit
            if (Item.omit) {
                const icon = (e.target as HTMLDivElement).firstChild as HTMLDivElement
                if (flag === 'enter') {
                    if (Item.type === 'prev') {
                        icon.className = 'iconfont icon-doubleleft'
                    } else {
                        icon.className = 'iconfont icon-doubleright-copy'
                    }
                } else {
                    icon.className = 'iconfont icon-shenglvehao'
                }
            }
        }

        const onInputEnter = (page: string | number) => {
            const lastPage = pageList.value[pageList.value.length - 1] as number
            if (Number(page) === Number(props.currentPage)) return
            emit('page-change', '')
            setTimeout(() => {
                if (Number(page) < 1) {
                    emit('page-change', 1)
                } else if (Number(page) > lastPage) {
                    emit('page-change', lastPage + '')
                } else {
                    emit('page-change', page)
                }
            });

        }

        return () => (
            <div class="a-pagination-content">
                <div class={`btn background prev ${disableBtnClass.value('prev')}`} onClick={() => prevNextPageActions('prev')}><span class="iconfont icon-left"></span></div>
                <div class="pagination-list">
                    {pageList.value.map((item, index) => (
                        <div onMouseleave={(e) => changeomitBtnClass(e, 'leave', item)} onMouseenter={(e) => changeomitBtnClass(e, 'enter', item)} onClick={() => changeCurrentPage(item)} key={index} class={paginationItemClass.value(item)}>{omitBtnRender(item)}</div>
                    ))}
                </div>
                <div class={`btn background next ${disableBtnClass.value('next')}`} onClick={() => prevNextPageActions('next')}><span class="iconfont icon-right"></span></div>
                <div class="a-pagination-goto">
                    <span>跳至</span>
                    <a-input width="35" placeholder="" value={props.currentPage} textCenter onEnter={(value: string | number) => onInputEnter(value)} />
                </div>
            </div>
        )
    }
})