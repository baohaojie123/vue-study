import { createStore } from 'vuex'
import { testData, testPosts, ColumnProps, PostProps } from './testData'
interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  description?: string
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const store = createStore<GlobalDataProps>({
  state: {
    columns: testData,
    posts: testPosts,
    user: { isLogin: true, nickName: 'bhj', column: '1' }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, nickName: 'bhj' }
      console.log(state.user)
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
      console.log('posts', state.posts)
    }
  },
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter(c => c._id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c._id === id)
    },
    getPostByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})

export default store