<template>
  <div class="column-detail-page w-75 mx-auto">
    <div class="column-info row mb-4 border-bottom pb-4 align-items-center"
         v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar.url"
             :alt="column.title"
             class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
            @click="loadMorePage"
            v-if="!isLastPage">
      加载更多
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import PostList from '../components/PostList.vue'
import { addColumnAvatar } from '../helper'
import { ColumnProps } from '../store'
import useLoadMore from '../hooks/useLoadMore'
export default defineComponent({
  components: { PostList },
  setup() {
    const route = useRoute()
    const store = useStore()
    const currentId = route.params.id
    const currentPage = computed(() => {
      if (store.state.posts.loadedColumns.currentId) {
        return store.state.posts.loadedColumns.currentId.currentPage
      } else {
        return 0
      }
    })
    const total = computed(() => {
      if (store.state.posts.loadedColumns.currentId) {
        return store.state.posts.loadedColumns.currentId.total
      } else {
        return 0
      }
    })
    const { loadMorePage, isLastPage } = useLoadMore('fetchPosts', total, {
      pageSize: 30,
      currentPage: currentPage.value ? currentPage.value + 1 : 2,
      cid: currentId
    })
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', {
        cid: currentId,
        pageSize: 30,
        currentPage: 1
      })
    })
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as
        | ColumnProps
        | undefined
      if (selectColumn) {
        // 处理当avatar不存在的情况
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const list = computed(() => store.getters.getPostByCid(currentId))

    return {
      column,
      list,
      currentPage,
      loadMorePage,
      isLastPage
    }
  }
})
</script>
