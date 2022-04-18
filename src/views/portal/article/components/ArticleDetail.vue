<template>
  <portalTemplate>
    <div class="nav">文章帖子 / 详情</div>
    <div class="main-content-box">
      <h2 class="title">{{ article.title }}</h2>
      <p class="name">
        <s-apace>
          <span>{{ article.writer }}</span>
        </s-apace>
      </p>
      <div class="article-content" style="white-space: pre-wrap">
        {{ article.content }}
      </div>
      <div v-for="item in article.images" :key="item">
        <a-image :width="250" style="margin-top: 10px" :src="item" />
      </div>
    </div>
  </portalTemplate>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { getArticleDetails } from '@/services'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      article: {},
      images: [],
      formData: {
        title: '',
        content: '',
        tags: null,
        isLook: null
      }
    })
    async function getArticle() {
      try {
        let id = router.currentRoute.value.params.id
        const { errMsg, data, success } = await getArticleDetails(id)
        if (success === true) {
          state.article = data
          console.log(data)
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    onMounted(() => {
      getArticle()
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.main-content-box {
  //min-height: calc(100%) !important;
  width: calc(70%) !important;
  text-align: center;
  margin-left: calc(15%) !important;
  .article-content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 14px;
    text-align: left;
  }
}

.imgshow {
  width: calc(50%) !important;
  max-height: 300px;
  object-fit: cover;
}
</style>
