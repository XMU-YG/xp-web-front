<template>
  <div class="card-box">
    <div class="top">
      <div class="img">
        <a-space>
          <img src="../../../../assets/images/girl2.png" alt="女生图片" />
          <span>张桑</span>
          <span>贵州大学</span>
          <span>网络工程</span>
        </a-space>
      </div>
      <span>2022-01-23 19:55:55</span>
    </div>
    <div class="content">
      <div class="title">文章标题文章标题文章标题文章标题</div>
      <div class="bottom">
        <div class="left">
          <a-space>
            <span><EyeOutlined class="icon" />1232</span>
            <span><MessageOutlined class="icon" />32</span>
            <span><LikeOutlined class="icon" />3333</span>
          </a-space>
        </div>
        <div class="right">
          <a-button type="primary">学习分享</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
export default {
  setup(props) {
    const state = reactive({})
    onMounted(() => {
      console.log(props.data)
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.card-box {
  box-shadow: 0px 0px 10px 0px rgba(48, 49, 51, 0.2);
  padding: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    .img img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }
  .content {
    margin-top: 10px;
    width: 100%;
    .title {
      font-size: 20px;
      font-weight: bolder;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 20px;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .icon {
        color: #3eb4f2;
        margin-right: 8px;
      }
      /deep/ .ant-btn {
        border-radius: 16px;
      }
    }
  }
}
</style>
