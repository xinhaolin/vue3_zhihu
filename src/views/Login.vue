<template>
  <div>
      <validate-form  @form-submit="onFormSubmit" ref="formRef" >
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
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '../components/createMessage'
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const emailVal = ref('111@test.com')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('111111')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const inputRef = ref<any>(null)
    const formRef = ref<any>(null)
    const onFormSubmit = (vaild:boolean) => {
      if (vaild) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(res => {
          console.log('res', res)
          createMessage('登录成功,两秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
      }
    }
    onMounted(() => {
      // formRef.value.cleanForm()
    })
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef,
      formRef
    }
  }
})
</script>

<style scoped>

</style>
