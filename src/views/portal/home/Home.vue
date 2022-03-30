<template>
  <portalTemplate>
    <div>门户首页</div>
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
