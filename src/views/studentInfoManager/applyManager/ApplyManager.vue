<!-- 申请信息管理 -->
<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey" class="custom-tabs">
      <a-tab-pane key="1" tab="申请管理">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute, useLink } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      activeKey: '1'
    })
    onMounted(() => {
      console.log(route)
    })
    return { ...toRefs(state) }
  }
}
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.my-icon {
  color: #fff;
}
</style>
