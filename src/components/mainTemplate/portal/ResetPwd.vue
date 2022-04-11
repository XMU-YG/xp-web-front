<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
  >
    <a-form-item has-feedback label="邮箱" name="mail">
      <a-input
        style="width: 430px"
        v-model:value="formState.mail"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="姓名" name="name">
      <a-input
        style="width: 430px"
        v-model:value="formState.name"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="旧密码" name="oldPass">
      <a-input
        style="width: 430px"
        v-model:value="formState.oldPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="新密码" name="newPass">
      <a-input
        style="width: 430px"
        v-model:value="formState.newPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="确认新密码" name="checkPass">
      <a-input
        style="width: 430px"
        v-model:value="formState.checkPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item has-feedback label="验证码" name="code">
      <a-input
        style="width: 230px"
        v-model:value="formState.code"
        type="password"
        autocomplete="off"
      />
      <img alt="验证码" style="margin-left: 10px" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit" style="width: 430px"
        >立即修改</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, toRefs, ref } from 'vue'
export default defineComponent({
  setup() {
    const formRef = ref()
    const state = reactive({
      formState: {
        mail: '',
        name: '',
        oldPass: '',
        newPass: '',
        checkPass: '',
        code: ''
      },
      rules: {
        mail: [
          {
            required: true,
            message: '邮箱不能为空',
            type: 'string',
            trigger: ['blur', 'change']
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
        oldPass: [
          {
            required: true,
            message: '旧密码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        newPass: [
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
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ]
      }
    })

    let checkAge = async (rule, value) => {
      if (!value) {
        return Promise.reject('Please input the age')
      }

      if (!Number.isInteger(value)) {
        return Promise.reject('Please input digits')
      } else {
        if (value < 18) {
          return Promise.reject('Age must be greater than 18')
        } else {
          return Promise.resolve()
        }
      }
    }

    let validatePass = async (rule, value) => {
      if (value === '') {
        return Promise.reject('Please input the password')
      } else {
        if (state.formState.checkPass !== '') {
          formRef.value.validateFields('checkPass')
        }

        return Promise.resolve()
      }
    }

    let validatePass2 = async (rule, value) => {
      if (value === '') {
        return Promise.reject('Please input the password again')
      } else if (value !== state.formState.pass) {
        return Promise.reject('Two inputs donmatch!')
      } else {
        return Promise.resolve()
      }
    }
    const layout = {
      labelCol: {
        span: 4
      },
      wrapperCol: {
        span: 14
      }
    }

    const handleFinish = values => {
      console.log(values, state.formState)
    }

    const handleFinishFailed = errors => {
      console.log(errors)
    }

    const resetForm = () => {
      formRef.value.resetFields()
    }

    return {
      ...toRefs(state),
      formRef,
      layout,
      handleFinishFailed,
      handleFinish,
      resetForm
    }
  }
})
</script>
