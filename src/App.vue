<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <column-list v-if="false" :list="list"></column-list>
    <validate-form @form-submit="onFormSubmit" >
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <validate-input
          v-model="emailVal"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
           ></validate-input>
        {{emailVal}}
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
          <validate-input
          v-model="passwordVal"
          :rules="passwordRules"
          placeholder="请输入密码"
          type="password"
           ></validate-input>
      </div>
      <template #submit >
        <span class="btn btn-danger" >submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import ValidateForm from './components/ValidateForm.vue'
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
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref('wahahaha')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const inputRef = ref<any>(null)
    const onFormSubmit = (vaild:boolean) => {
      console.log('inputRef', inputRef.value.validateInput())
      console.log('结果', vaild)
    }
    return {
      list: testData,
      currentUser,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>
</style>
