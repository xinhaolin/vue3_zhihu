<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list v-if="false" :list="list"></column-list>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div v-if="emailRef.error" id="emailHelp" class="form-text">
         {{emailRef.message}}
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
const currentUser: UserProps = {
  isLogin: true,
  name: 'xinhaolin'
}
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这个是test1的专栏，有一点非常有意思的简介，可以更新一下哦',
    avatar: 'http://img0.pconline.com.cn/pconline/news/it/2103/20213/16/16158785313313510.png'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这个是test3的专栏，有一点非常有意思的简介，可以更新一下哦',
    avatar: 'http://img0.pconline.com.cn/pconline/news/it/2103/20213/16/16158785313313510.png'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这个是test3的专栏，有一点非常有意思的简介，可以更新一下哦',
    avatar: 'http://img0.pconline.com.cn/pconline/news/it/2103/20213/16/16158785313313510.png'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这个是test4的专栏，有一点非常有意思的简介，可以更新一下哦'
    // avatar: 'http://img0.pconline.com.cn/pconline/news/it/2103/20213/16/16158785313313510.png'
  }
]
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmail = () => {
      if (emailRef.val.trim() === '') {
        emailRef.error = true
        emailRef.message = 'can not be empty'
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true
        emailRef.message = 'should be valid email'
      }
    }
    return {
      list: testData,
      currentUser,
      emailRef,
      validateEmail
    }
  }
})
</script>

<style>
</style>
