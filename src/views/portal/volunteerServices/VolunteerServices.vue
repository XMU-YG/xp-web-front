<template>
  <portalTemplate>
    <div class="nav">志愿者服务</div>
    <div class="main-content-box">
      <a-table
        :columns="columns"
        rowKey="id"
        :dataSource="list"
        :loading="loading"
        :pagination="{
          current: pageIndex,
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'], //每页中显示的数据
          showTotal: infoTotal => `共${infoTotal}条`,
          showQuickJumper: true
        }"
        @change="changePage"
      >
        <template #name="{ record }">
          <a style="text-decoration: underline" @click="applyBtn(record)">{{
            record.name
          }}</a>
        </template>
        <template #operation="{ record }">
          <a-space>
            <a
              :href="record.applyMaterial"
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
      width="600px"
      v-model:visible="visible"
      title="家访反馈"
      okText="保存"
      @ok="onSubmit"
    >
      <a-form ref="formRef" :model="formState" :rules="rules">
        <div class="item-box">
          <span class="label">学生姓名:</span>
          <span class="content">张三</span>
        </div>
        <div class="item-box">
          <span class="label">高中学校:</span>
          <span class="content">xxxx中学</span>
        </div>
        <a-form-item label="情况是否属实" name="isTrue">
          <a-select v-model:value="formState.isTrue">
            <a-select-option :value="1">是</a-select-option>
            <a-select-option :value="2">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="志愿者反馈" name="feedback">
          <a-textarea v-model:value="formState.feedback" />
        </a-form-item>
        <div class="item-box">
          <span class="label">家访志愿者:</span>
          <span class="content">李四</span>
        </div>
        <a-form-item label="家访资料" name="fileList">
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
    <a-modal
      width="600px"
      v-model:visible="applyVisible"
      title="申请表信息"
      :footer="null"
    >
      <div class="apply-box">
        <div class="item">
          <span class="label">姓名：</span>
          <span class="content">张三</span>
        </div>
        <div class="item">
          <span class="label">家庭总人数：</span>
          <span class="content">7</span>
        </div>
        <div class="item">
          <span class="label">就业总人数：</span>
          <span class="content">5</span>
        </div>
        <div class="item">
          <span class="label">赡养人数：</span>
          <span class="content">5</span>
        </div>
        <div class="item">
          <span class="label">就学人数：</span>
          <span class="content">3</span>
        </div>
        <div class="item">
          <span class="label">欠债金额：</span>
          <span class="content">123123</span>
        </div>
        <div class="item">
          <span class="label">欠债原因：</span>
          <span class="content">张三</span>
        </div>
        <div class="item">
          <span class="label">是否申请助学贷款：</span>
          <span class="content">是</span>
        </div>
        <div class="item">
          <span class="label">申请原因：</span>
          <span class="content">张三</span>
        </div>
      </div>
    </a-modal>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { message } from 'ant-design-vue'
import LocalSave from '@/utils/localSave'
import { getStudentsByVolunteerId } from '@/hooks'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const state = reactive({
      visible: false,
      applyVisible: false,
      currentObj: {},
      pageIndex: 1,
      pageSize: 5,
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          slots: { customRender: 'name' }
        },
        {
          title: '高中学校',
          dataIndex: 'highSchool',
          key: 'highSchool',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: 'QQ',
          dataIndex: 'qq',
          key: 'qq',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '微信',
          dataIndex: 'weixin',
          key: 'weixin',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '家庭地址',
          dataIndex: 'living',
          key: 'living',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '申请状态',
          dataIndex: 'applyStatus',
          key: 'applyStatus',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
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
      formState: {
        isTrue: null,
        feedback: null,
        fileList: []
      },
      rules: {
        isTrue: [
          {
            required: true,
            message: '情况是否属实不能为空',
            trigger: 'blur'
          }
        ],
        feedback: [
          {
            required: true,
            message: '志愿者反馈不能为空',
            trigger: 'blur'
          }
        ],
        fileList: [
          {
            required: true,
            message: '家访资料不能为空',
            trigger: 'blur'
          }
        ]
      }
    })

    const { list, loading, setList } = getStudentsByVolunteerId(
      LocalSave.getJson('cookieUser').id
    )
    //家访反馈
    function feedback(record) {
      state.visible = true
      state.currentObj = record
    }

    //查看申请信息
    function applyBtn(record) {
      state.applyVisible = true
      state.currentObj = record
    }

    const handleChange = ({ file, fileList }) => {
      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    }

    const formRef = ref(null)
    //保存家访反馈
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          const params = {
            ...state.formState
          }
          console.log(params)
        })
        .catch(error => {
          message.warning('请按规则完善字段')
        })
    }

    return {
      ...toRefs(state),
      feedback,
      list,
      loading,
      applyBtn,
      onSubmit,
      formRef,
      handleChange
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-form-item-label > label {
  width: 108px;
  text-align: right;
  display: inline-block;
}
.item-box {
  margin-bottom: 20px;
  .label {
    width: 108px;
    padding-right: 6px;
    text-align: right;
    display: inline-block;
  }
}
.apply-box {
  .item {
    margin-bottom: 10px;
  }
}
</style>
