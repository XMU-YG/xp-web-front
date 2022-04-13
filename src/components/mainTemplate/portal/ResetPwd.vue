<template>
  <a-form ref="formRef" :model="formState" :rules="rules">
    <a-form-item label="邮箱" name="mail">
      <a-input
        style="width: 430px"
        v-model:value="formState.mail"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="姓名" name="name">
      <a-input
        style="width: 430px"
        v-model:value="formState.name"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="旧密码" name="oldPass">
      <a-input
        style="width: 430px"
        v-model:value="formState.oldPass"
        type="password"
        autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="新密码" name="newPass">
      <a-input
        style="width: 430px"
        v-model:value="formState.newPass"
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
    <a-form-item label="验证码" name="code">
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
import { message } from 'ant-design-vue'
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
          },
          {
            type: 'string',
            trigger: ['blur', 'change'],
            validator: validateRules
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

    //手机号码/联系电话自定义校验
    function validateRules(rule, value) {
      if (!state.formState.newPass || state.formState.newPass === value) {
        return Promise.resolve()
      } else {
        return Promise.reject('确认密码与新密码不一致')
      }
    }

    const submit = () => {
      formRef.value
        .validate()
        .then(() => {
          const params = {
            ...state.formState
          }
          console.log(params, 'params')
        })
        .catch(() => {
          message.warning('请按规则完善字段')
        })
    }

    return {
      ...toRefs(state),
      formRef,
      submit
    }
  }
})
</script>
<style scoped>
/deep/ label.ant-form-item-required {
  display: inline-block;
  width: 95px;
  text-align: right;
}
</style>
