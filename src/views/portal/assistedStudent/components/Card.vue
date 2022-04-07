<template>
  <div class="card-box">
    <div class="img">
      <img src="../../../../assets/images/女孩.png" alt="女生图片" />
    </div>
    <div class="content">
      <div class="name">张荣美</div>
      <div class="description">
        <a-row :gutter="[24, 20]" style="width: 100%">
          <a-col :xxl="12" :xl="12">
            <span><BankOutlined class="icon" />贵州大学</span>
          </a-col>
          <a-col :xxl="12" :xl="12">
            <span><PhoneOutlined class="icon" />1770853****</span>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({})

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
  display: flex;
  .img img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .content {
    width: 100%;
    .name {
      font-size: 18px;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 20px;
    }
    .description {
      border-top: 1px dashed #cecece;
      padding: 20px 0;
      .icon {
        font-size: 16px;
        margin-right: 8px;
        color: #3eb4f2;
      }
    }
  }
}
</style>
