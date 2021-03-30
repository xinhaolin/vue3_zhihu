import { createStore, Commit } from 'vuex'
import axios from 'axios'

export interface ResponseType<P = Record<string, never>> {
  code: number;
  msg: string;
  data: P;
}

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface UserProps {
  isLogin: boolean,
  nickName?: string,
  _id?: string,
  column?: string,
  email?: string
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

export interface GlobalErrorProps {
  status: boolean;
  message?: string;
}

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, params:any) => {
  const { data } = await axios.post(url, params)
  commit(mutationName, data)
  return data
}
export interface GlobalDataProps {
  error: GlobalErrorProps,
  token: string,
  loading: boolean,
  columns: ColumnProps[],
  posts: PostProps[],
  user: UserProps
}

const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: localStorage.getItem('token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: { isLogin: false }
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
    },
    fetchCurrentUser (state, raw) {
      state.user = { isLogin: true, ...raw.data }
    },
    login (state, raw) {
      const { token } = raw.data
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout (state) {
      state.token = ''
      state.user = { isLogin: false }
      localStorage.remove('token')
      delete axios.defaults.headers.common.Authorization
    },
    setError (state, e:GlobalErrorProps) {
      state.error = e
    }
  },
  actions: {
    fetchColumns ({ commit }) {
      getAndCommit('/columns', 'fetchColumns', commit)
    },
    featchColumn ({ commit }, cid) {
      getAndCommit(`/columns/${cid}`, 'featchColumn', commit)
    },
    featchPosts ({ commit }, cid) {
      getAndCommit(`/columns/${cid}/posts`, 'featchPosts', commit)
    },
    fetchCurrentUser ({ commit }) {
      return getAndCommit('/user/current', 'fetchCurrentUser', commit)
    },
    login ({ commit }, payload) {
      return postAndCommit('/user/login', 'login', commit, payload)
    },
    loginAndFetch ({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    }
  }

})

export default store
