<template>
  <div class="card-box">
    <div class="top">
      <div class="img">
        <a-space>
          <img :src="data.avatar" />
          <span>{{ data.writer }}</span>
          <span>{{ data.writerUniversity }}</span>
          <span>{{ data.writerMajor }}</span>
        </a-space>
      </div>
      <span>{{ data.gmtCreate }}</span>
    </div>
    <div class="content">
      <div class="title">{{ data.title }}</div>
      <div class="bottom">
        <div class="left">
          <a-space>
            <span><EyeOutlined class="icon" />{{ data.browse }}</span>
            <span><MessageOutlined class="icon" />{{ data.topicNum }}</span>
            <span><LikeOutlined class="icon" />{{ data.praiseNum }}</span>
          </a-space>
        </div>
        <div class="right">
          <a-button type="primary">{{ data.mark }}</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from 'vue'
import moment from 'moment'
export default {
  props: {
    data: Object
  },
  setup(props) {
    const state = reactive({})

    onMounted(() => {
      console.log(props.data, 'data')
    })

    return {
      ...toRefs(state),
      moment
    }
  }
}
</script>

<style scoped lang="less">
.card-box {
  box-shadow: 0px 0px 10px 0px rgba(48, 49, 51, 0.2);
  padding: 20px;
  margin-bottom: 20px;
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
