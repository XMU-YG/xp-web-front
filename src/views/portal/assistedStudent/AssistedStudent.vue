<template>
  <portalTemplate>
    <div class="nav">受助学生</div>
    <div class="main-content-box">
      <div class="search">
        <a-input-search
          style="width: 50%"
          v-model:value="value"
          placeholder="请输入学生名字/小平编号搜索"
          enter-button
          @search="onSearch"
        />
      </div>
      <Card />
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import Card from './components/Card'
export default {
  components: {
    portalTemplate,
    Card
  },
  setup() {
    const state = reactive({})

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.search {
  text-align: right;
  margin-bottom: 20px;
}
</style>
