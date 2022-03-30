<template>
  <portalTemplate>
    <div class="nav">文章帖子</div>
    <div class="main-content-box">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="所有文章">
          <div class="search">
            <a-input-search
              style="width: 50%"
              v-model:value="value"
              placeholder="请输入文章标题关键字搜索"
              enter-button
              @search="onSearch"
            />
          </div>
          <a-row :gutter="[10, 20]" style="width: 100%">
            <a-col :xxl="12" :xl="12" v-for="item in 20" :key="item">
              <Card />
            </a-col>
          </a-row>
          <div class="pagination">
            <a-pagination v-model:current="current" :total="500" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="我的文章">
          <div class="search">
            <a-input-search
              style="width: 50%"
              v-model:value="value"
              placeholder="请输入文章标题关键字搜索"
              enter-button
              @search="onSearch"
            />
          </div>
          <a-row :gutter="[10, 20]" style="width: 100%">
            <a-col :xxl="12" :xl="12" v-for="item in 20" :key="item">
              <Card />
            </a-col>
          </a-row>
          <div class="pagination">
            <a-pagination v-model:current="current" :total="500" />
          </div>
        </a-tab-pane>
        <template #tabBarExtraContent>
          <a-button>我要发布</a-button>
        </template>
      </a-tabs>
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
    const state = reactive({
      current: 1,
      activeKey: '1'
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.search {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
