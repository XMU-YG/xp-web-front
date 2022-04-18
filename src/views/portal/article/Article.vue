<template>
  <portalTemplate>
    <div class="nav">文章帖子</div>
    <div class="main-content-box">
      <a-tabs @change="handleTagChange" v-model:activeKey="activeKey">
        <a-tab-pane key="all" tab="所有文章">
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
            <a-col :xxl="12" :xl="12" v-for="item in list" :key="item.id">
              <Card @click="openDetail(item.id)" :data="{ ...item }" />
            </a-col>
          </a-row>
          <div class="pagination">
            <a-pagination v-model:current="current" :total="total" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="self" tab="我的文章">
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
            <a-col :xxl="12" :xl="12" v-for="item in list" :key="item.id">
              <Card @click="openDetail(item.id)" :data="{ ...item }" />
            </a-col>
          </a-row>
          <div class="pagination">
            <a-pagination v-model:current="current" :total="total" />
          </div>
        </a-tab-pane>
        <template #tabBarExtraContent>
          <a-button @click="publishBtn">我要发布</a-button>
        </template>
      </a-tabs>
    </div>
  </portalTemplate>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
import { getAllArticle, getArticleByUserId } from '@/services'
import Card from '@/views/portal/home/components/Card'
import { message } from 'ant-design-vue'
import LocalSave from '@/utils/localSave'
export default {
  components: {
    portalTemplate,
    Card
  },
  setup() {
    const state = reactive({
      current: 1,
      activeKey: 'all',
      list: [],
      loading: false,
      total: 0
    })

    const router = useRouter()

    //我要发布
    function publishBtn() {
      let routeData = router.resolve({
        path: '/article-publish/' + 'ididididsafsdafdsafdsafd',
        query: { type: 'publish' }
      })
      window.open(routeData.href, '_blank')
    }

    //查看详情
    function openDetail(id) {
      console.log(id)
      let routeData = router.resolve({
        path: '/article-detail/' + id,
        query: { type: 'detail' }
      })
      window.open(routeData.href, '_blank')
    }

    async function setList(params) {
      try {
        state.loading = true
        const { errMsg, data, success } = await getAllArticle(params)
        state.loading = false
        if (success === true) {
          state.list = data.list
          console.log(state.list)
          state.total = data.total
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    async function setArticles(userId) {
      try {
        state.loading = true
        const { errMsg, data, success } = await getArticleByUserId(userId)
        state.loading = false
        if (success === true) {
          state.list = data
          state.total = data.length
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    function handleTagChange() {
      console.log(state.activeKey)
      if (state.activeKey === 'all') {
        setList({
          pageIndex: state.current
        })
      } else {
        setArticles(LocalSave.getJson('cookieUser').id)
      }
    }

    onMounted(() => {
      setList()
    })

    return {
      ...toRefs(state),
      publishBtn,
      openDetail,
      handleTagChange
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
