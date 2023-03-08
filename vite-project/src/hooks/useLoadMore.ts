import { useStore } from "vuex"
import { ref, computed, ComputedRef } from 'vue'
interface LoadParams {
  currentPage: number;
  pageSize: number;
  cid?: string
}
// total 没有初使值，因为在第一次请求之后才能获取，后期会变化,所以是响应式的
const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = { currentPage: 2, pageSize: 5 }) => {
  const store = useStore()
  const currentPage = ref(params.currentPage)
  const requestParams = computed(() => ({
    currentPage: currentPage.value,
    pageSize: params.pageSize,
    cid: params.cid
  }))
  const loadMorePage = () => {
    store.dispatch(actionName, requestParams.value).then(() => {
      currentPage.value++
    })
  }
  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })
  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore