<template>
  <portalTemplate>
    <div class="nav">受助相关</div>
    <div class="main-content-box">
      受助相关受助相关受助相关受助相关受助相关受助相关
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
