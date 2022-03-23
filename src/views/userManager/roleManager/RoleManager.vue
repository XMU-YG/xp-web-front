<!-- 组织管理 -->
<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey" class="custom-tabs">
      <a-tab-pane key="1" tab="角色管理">Content of Tab Pane 1</a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2">Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
