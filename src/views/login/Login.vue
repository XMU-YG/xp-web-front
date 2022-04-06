<!-- 预受助学生管理 -->
<template>
  <div class="bg-box"></div>
  <div class="login-wrapper">
    <div class="login-box">
      <div class="big-title">小平基金会管理系统</div>
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        style="width: 100%"
        class="login-form"
      >
        <div class="little-title">用户登录</div>
        <a-form-item label="" name="username">
          <a-input
            v-model:value="formState.username"
            placeholder="请输入用户名"
          />
        </a-form-item>
        <a-form-item label="" name="password">
          <a-input
            type="password"
            v-model:value="formState.password"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item label="" name="verificationCode">
          <a-input
            v-model:value="formState.verificationCode"
            placeholder="请输入验证码"
            style="width: 70%; margin-right: 10px"
          />
          <img src="" alt="验证码" />
        </a-form-item>
        <a-form-item label="登录类型" name="type">
          <a-radio-group v-model:value="formState.type">
            <a-radio value="1">学校</a-radio>
            <a-radio value="2">学生</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="">
          <a-button type="primary" style="width: 100%" @click="okBtn"
            >登录</a-button
          >
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup() {
    const state = reactive({
      formState: {
        username: '',
        password: '',
        verificationCode: '',
        type: 2
      },
      rules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        verificationCode: [
          {
            required: true,
            message: '验证码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ]
      }
    })

    const formRef = ref()
    //验证及保存
    const okBtn = () => {
      formRef.value
        .validate()
        .then(() => {
          submit()
        })
        .catch(() => {})
    }

    async function submit() {
      const params = {
        username: state.formState.username,
        password: state.formState.password,
        verificationCode: state.formState.verificationCode,
        type: state.formState.type
      }
      console.log(params, 'params')
    }

    return {
      ...toRefs(state),
      okBtn,
      formRef
    }
  }
})
</script>

<style scoped lang="less">
/* @import url(); 引入css类 */
.bg-box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url('./bg_img.png');
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
.login-wrapper {
  width: 100%;
  height: 100%;
  .login-box {
    width: 520px;
    margin: auto;
    position: relative;
    top: calc(50% - 240px);
    .big-title {
      font-size: 24px;
      font-weight: bold;
      color: #096bcc;
      text-align: center;
      margin-bottom: 20px;
    }
    .login-form {
      background: #fff;
      width: 520px;
      height: 364px;
      overflow: hidden;
      padding: 20px 40px;
      .little-title {
        color: #096bcc;
        font-size: 18px;
        text-align: center;
        margin-bottom: 20px;
      }
      /deep/ .ant-form-item-label > label,
      /deep/ .ant-input,
      label,
      img {
        color: #096bcc;
      }
      /deep/ .ant-btn-primary {
        color: #fff;
        background: #096bcc;
        border-color: #096bcc;
      }
    }
  }
}
</style>
