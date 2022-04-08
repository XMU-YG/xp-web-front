<template>
  <portalTemplate>
    <div class="nav">志愿者服务</div>
    <div class="main-content-box">
      <a-table
        :columns="columns"
        rowKey="id"
        :dataSource="dataSource"
        size="middle"
        :pagination="false"
      >
        <template #operation="{ record }">
          <a-space>
            <a
              @click="lookReport(record)"
              style="text-decoration: underline; color: green"
              >下载申请材料</a
            >
            <a @click="feedback(record)" style="text-decoration: underline"
              >家访反馈</a
            >
          </a-space>
        </template>
      </a-table>
    </div>
    <a-modal
      width="800px"
      v-model:visible="visible"
      title="家访反馈"
      @ok="onSubmit"
    >
      <a-form ref="formRef" :model="formState">
        <a-form-item label="学生姓名">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="高中学校">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="情况是否属实">
          <a-select v-model:value="formState.name">
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="2">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="志愿者反馈">
          <a-textarea v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="家访志愿者">
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item label="上传家访资料">
          <a-upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            v-model:file-list="formState.fileList"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </a-upload>
        </a-form-item>
      </a-form>
    </a-modal>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const state = reactive({
      visible: false,
      currentObj: {},
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '高中学校',
          dataIndex: 'highSchool',
          key: 'highSchool'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: 'QQ',
          dataIndex: 'qq',
          key: 'qq'
        },
        {
          title: '微信',
          dataIndex: 'weixin',
          key: 'weixin'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '家庭地址',
          dataIndex: 'living',
          key: 'living'
        },
        {
          title: '申请状态',
          dataIndex: 'applyStatus',
          key: 'applyStatus'
        },
        {
          title: '',
          dataIndex: 'operation',
          key: 'operation',
          width: '200px',
          fixed: 'right',
          slots: { customRender: 'operation' }
        }
      ],
      dataSource: [
        {
          id: Math.random(),
          number: 'xp123123',
          name: '张三',
          tel: '15464687127'
        },
        {
          id: Math.random(),
          number: 'xp123123',
          name: '张三',
          tel: '15464687127'
        },
        {
          id: Math.random(),
          number: 'xp123123',
          name: '张三',
          tel: '15464687127'
        }
      ],
      formState: {
        name: '',
        fileList: [
          {
            uid: '1',
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500',
            // custom error message to show
            url: 'http://www.baidu.com/xxx.png'
          },
          {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png'
          },
          {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500',
            // custom error message to show
            url: 'http://www.baidu.com/zzz.png'
          }
        ]
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur'
          }
        ]
      }
    })

    //家访反馈
    function feedback(record) {
      state.visible = true
      state.currentObj = record
    }

    const handleChange = ({ file, fileList }) => {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    }

    const formRef = ref(null)
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          console.log('values', state.formState)
        })
        .catch(error => {
          console.log('error', error)
        })
    }

    return {
      ...toRefs(state),
      feedback,
      onSubmit,
      formRef,
      handleChange
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-form-item-label > label {
  width: 95px;
  text-align: right;
  display: inline-block;
}
</style>
