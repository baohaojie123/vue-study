import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string
}
export interface PostProps {
  _id: number;
  title: string;
  content: string;
  image?: ImageProps;
  createdAt: string;
  excerpt?: string;
  columnId: string;
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}
interface UserProps {
  isLogin: boolean
  nickName?: string
  _id?: string
  column?: string
  email?: string
  description?: string
}
export interface GlobalDataProps {
  loading: boolean;
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}
const getAndCommit = async (url: string, mutationsName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationsName, data)

}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, nickName: 'bhj', column: '1' }
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, nickName: 'bhj' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list
    },
    setLoading(state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit(`/columns?currentPage=1&pageSize=6`, 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      console.log('state.columns', state.columns)
      return state.columns[0]
    },
    getPostByCid: (state) => (cid: string) => {
      return state.posts
    }
  }
})

export default store