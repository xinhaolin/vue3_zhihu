<template>
<div class="container" >
  <global-header :user="currentUser" ></global-header>
  <column-list :list="list" ></column-list>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader
  },
  setup () {
    return {
      list: testData,
      currentUser
    }
  }
})
</script>

<style>

</style>
