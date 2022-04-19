<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="邮箱" name="email">
      <a-input
        style="width: 430px"
        v-model:value="formState.email"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="姓名" name="name">
      <a-input
        style="width: 430px"
        v-model:value="formState.name"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="新密码" name="password">
      <a-input
        style="width: 430px"
        v-model:value="formState.password"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="确认新密码" name="checkPass">
      <a-input
        style="width: 430px"
        v-model:value="formState.checkPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="验证码" name="verifyCode">
      <a-input
        style="width: 230px"
        v-model:value="formState.verifyCode"
        autocomplete="off"
      />
      <a-button
        :disabled="haveSend"
        @click="send"
        type="primary"
        style="margin-left: 10px"
        >{{ text }}</a-button
      >
      <!-- <a-statistic-countdown :value="deadline" style="margin-left: 10px" /> -->
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="submit" style="width: 430px"
        >立即修改</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { message } from 'ant-design-vue'
import { resetPwd, sendCodeToEmail } from '@/hooks'
import router from '@/router'
export default defineComponent({
  setup() {
    const formRef = ref()
    const state = reactive({
      haveSend: false,
      formState: {},
      text: '验证码',
      timer: null,
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30,
      rules: {
        email: [
          {
            required: true,
            message: '邮箱不能为空, 且格式正确',
            type: 'string',
            trigger: ['blur', 'change'],
            validator: validateEmail
          }
        ],
        name: [
          {
            required: true,
            message: '名字不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '新密码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        checkPass: [
          {
            required: true,
            message: '确认密码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          },
          {
            type: 'string',
            trigger: ['blur', 'change'],
            validator: validateRules
          }
        ],
        verifyCode: [
          {
            required: true,
            message: '验证码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ]
      }
    })

    function setTime() {
      let countDownNum = 60
      state.timer = setInterval(function () {
        //这里把setInterval赋值给变量名为timer的变量

        countDownNum--

        state.text = countDownNum + ' s'

        if (countDownNum == 0) {
          clearInterval(state.timer)
          state.haveSend = false
          state.text = '验证码'
        }
      }, 1000)
    }

    function validateEmail(rule, value) {
      var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
      if (value && reg.test(value)) {
        return Promise.resolve()
      } else {
        return Promise.reject('邮箱格式不正确')
      }
    }

    function checkEmail(email) {
      var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/
      return email && reg.test(email)
    }

    //手机号码/联系电话自定义校验
    function validateRules(rule, value) {
      if (!state.formState.password || state.formState.password === value) {
        return Promise.resolve()
      } else {
        return Promise.reject('确认密码与新密码不一致')
      }
    }

    function send() {
      if (!checkEmail(state.formState.email)) {
        message.warn('请输入邮箱')
      } else {
        state.haveSend = true
        setTime()
        sendCodeToEmail(state.formState.email, '重置密码')
      }
    }

    const submit = () => {
      formRef.value
        .validate()
        .then(() => {
          const params = {
            ...state.formState
          }
          resetPwd(params)
          router.push('/home')
        })
        .catch(() => {
          message.warning('请按规则完善字段')
        })
    }

    return {
      ...toRefs(state),
      formRef,
      submit,
      send
    }
  }
})
</script>
<style scoped>
.label.ant-form-item-required {
  display: inline-block;
  width: 95px;
  text-align: right;
}
</style>
