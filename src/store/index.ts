import { createStore, Commit } from 'vuex'
import axios from 'axios'

interface UserProps {
  isLogin: boolean,
  name?: string,
  id?: number,
  columnId?: number,
}
interface ImageProps {
  _id?: string,
  url?: string,
  createdAt?: string
}
export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios(url)
  commit(mutationName, data)
}
export interface GlobalDataProps {
  loading: boolean,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: true, name: 'xinhaolin', columnId: 1 }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find(c => c._id === id)
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter(post => post.column === cid)
    }
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    },
    login (state) {
      state.user = { ...state.user, isLogin: true, name: 'xinhaolin', columnId: 1 }
    },
    createPost (state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns (state, raw) {
      state.columns = raw.data.list
    },
    featchColumn (state, raw) {
      state.columns = [raw.data]
    },
    featchPosts (state, raw) {
      state.posts = raw.data.list
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    featchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'featchColumn', commit)
    },
    async featchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'featchPosts', commit)
    }
  }

})

export default store
