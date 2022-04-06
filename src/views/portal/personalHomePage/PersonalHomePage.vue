<template>
  <portalTemplate>
    <div class="nav">个人主页</div>
    <div class="main-content-box">
      个人主页个人主页个人主页个人主页个人主页个人主页个人主页
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const state = reactive({})

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less"></style>
