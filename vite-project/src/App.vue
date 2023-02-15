<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list :list="list"></column-list>
  </div>
</template>
<script  lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import { defineComponent } from 'vue'
const user: UserProps = {
  isLogin: true,
  nickName: 'bhj'
}
const testData: ColumnProps[] = [
  {
    _id: '1',
    title: '1123',
    avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    description: '1111'
  },
  {
    _id: '1',
    title: '1123',
    avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    description: '1111'
  },
  {
    _id: '1',
    title: '1123',
    avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    description: '1111'
  }
]
export default defineComponent({
  name: 'App',
  components: { ColumnList, GlobalHeader },
  setup() {
    return {
      list: testData,
      currentUser: user
    }
  }
})
</script>

<style scoped>
</style>
