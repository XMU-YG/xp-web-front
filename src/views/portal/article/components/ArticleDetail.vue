<template>
  <portalTemplate>
    <div class="nav">文章帖子 / 详情</div>
    <div class="main-content-box">
      <h2 class="title">文章标题标题</h2>
      <p class="name">
        <s-apace>
          <span>姓名</span>
          <span>2022-01-03</span>
        </s-apace>
      </p>
      <div class="article-content">
        文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正章正文文章正文文章正文文章正文文章正章正文文章正文
        文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文文章正文
      </div>
      <img alt="" />
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const state = reactive({
      formData: {
        title: '',
        content: '',
        tags: null,
        isLook: null
      }
    })

    const router = useRouter()

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.main-content-box {
  min-height: calc(100% - 70px) !important;
  text-align: center;
  .article-content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 14px;
    text-align: left;
  }
}
</style>
