<template>
  <form class="validate-form-container" >
    <slot name="default" ></slot>
    <div class="submit-area" @click.prevent="submitForm" >
      <slot name="submit" >
        <button type="submit" class="btn btn-primary" >提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()
type ValidateFunc = ()=>boolean
type CleanInputFinc = ()=>void
export default defineComponent({
  emits: ['form-submit'],
  setup (props, context) {
    let funcArr: ValidateFunc[] = []
    let cleanArr: CleanInputFinc[] = []
    const submitForm = () => {
      const result = funcArr.map(func => func()).every(res => res)
      context.emit('form-submit', result)
    }
    const cleanForm = () => {
      cleanArr.forEach(fn => fn())
    }
    const callbackFn = (func:ValidateFunc | undefined) => {
      funcArr.push(func as ValidateFunc)
    }
    const cleanCb = (func:CleanInputFinc|undefined) => {
      cleanArr.push(func as CleanInputFinc)
    }
    emitter.on('form-item-created', callbackFn)
    emitter.on('form-item-clean', cleanCb)
    onUnmounted(() => {
      emitter.off('form-item-created', callbackFn)
      funcArr = []
      emitter.off('form-item-clean', cleanCb)
      cleanArr = []
    })
    return {
      submitForm,
      cleanForm
    }
  }
})
</script>

<style scoped>

</style>
