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
export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const emailVal = ref('123@test.com')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('123')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const inputRef = ref<any>(null)
    const formRef = ref<any>(null)
    const onFormSubmit = (vaild:boolean) => {
      if (vaild) {
        store.commit('login')
        router.push('/')
      }
    }
    onMounted(() => {
      formRef.value.cleanForm()
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
