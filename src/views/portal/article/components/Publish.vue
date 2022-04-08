<template>
  <portalTemplate>
    <div class="nav">文章帖子 / 我要发布</div>
    <div class="main-content-box">
      <a-input
        v-model:value="formData.title"
        placeholder="请输入文章标题"
        class="title"
      />
      <a-textarea
        class="content"
        v-model:value="formData.content"
        placeholder="请输入正文"
        :auto-size="{ minRows: 10, maxRows: 10 }"
      />
      <div class="img">
        <p>图片上传</p>
        <Upload />
      </div>
      <div class="item">
        <span class="label">文章标签</span>
        <a-select
          ref="select"
          v-model:value="formData.tags"
          style="width: calc(100% - 70px)"
          mode="multiple"
        >
          <a-select-option :value="1">成绩报告</a-select-option>
          <a-select-option :value="2">感谢信</a-select-option>
          <a-select-option :value="3">学习分享</a-select-option>
        </a-select>
      </div>
      <div class="item">
        <span class="label">谁可以看</span>
        <a-select
          ref="select"
          v-model:value="formData.isLook"
          style="width: calc(100% - 70px)"
        >
          <a-select-option :value="2">仅导师可见</a-select-option>
          <a-select-option :value="3">所有人可见</a-select-option>
        </a-select>
      </div>
      <div class="btn">
        <a-button type="primary">发布</a-button>
      </div>
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
import Upload from './Upload'
export default {
  components: {
    portalTemplate,
    Upload
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
  height: 100%;
  .title.ant-input,
  .title.ant-input:hover,
  .title.ant-input:focus {
    color: #303133;
    border-bottom: 1px solid #cecece;
    border-left: none !important;
    border-top: none !important;
    border-right: none !important;
    font-size: 24px;
    font-weight: bolder;
    box-shadow: none;
  }
  .content {
    margin: 20px 0;
  }
  .img {
    margin: 10px;
    p {
      color: #606266;
      border-bottom: 20px solid #fff;
    }
  }
  .item {
    margin-bottom: 20px;
    .label {
      margin-right: 10px;
    }
  }
  .btn {
    margin-bottom: 50px;
  }
}
</style>
