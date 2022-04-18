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
        <a-form-item label="家访学生" name="studentName">
          <a-input v-model:value="formState.studentName" :disabled="true" />
        </a-form-item>
        <a-form-item label="高中学校" name="highSchool">
          <a-input v-model:value="formState.highschool" :disabled="true" />
        </a-form-item>
        <a-form-item label="情况是否属实" name="isTrue">
          <a-select v-model:value="formState.isTrue">
            <a-select-option value="是">是</a-select-option>
            <a-select-option value="否">否</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="志愿者反馈" name="feedback">
          <a-textarea v-model:value="formState.feedback" />
        </a-form-item>
        <a-form-item label="家访志愿者" name="volunteer">
          <a-input v-model:value="formState.volunteer" />
        </a-form-item>
        <a-form-item label="家访资料" name="material">
          <a v-if="!reload" :href="formState.material">点击下载</a>
          <a-button style="margin-left: 10px" v-if="!reload" @click="reloadBtn"
            >重新上传</a-button
          >

          <a-upload
            v-if="reload"
            :defaultFileList="formState.fileList"
            :limit="1"
            action="/api/file/upload?path=apply/visit"
            @change="handleChange"
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
          <span class="content">{{ currentObj.name }}</span>
        </div>
        <div class="item">
          <span class="label">家庭总人数：</span>
          <span class="content">{{ applyInfo.allPerson }}</span>
        </div>
        <div class="item">
          <span class="label">就业总人数：</span>
          <span class="content">{{ applyInfo.workPerson }}</span>
        </div>
        <div class="item">
          <span class="label">赡养人数：</span>
          <span class="content">{{ applyInfo.adaptPerson }}</span>
        </div>
        <div class="item">
          <span class="label">就学人数：</span>
          <span class="content">{{ applyInfo.studyPerson }}</span>
        </div>
        <div class="item">
          <span class="label">欠债金额：</span>
          <span class="content">{{ applyInfo.debtMoney }}</span>
        </div>
        <div class="item">
          <span class="label">欠债原因：</span>
          <span class="content">{{ applyInfo.debtResion }}</span>
        </div>
        <div class="item">
          <span class="label">是否申请助学贷款：</span>
          <span class="content">{{
            applyInfo.isstuloans === 1 ? '是' : '否'
          }}</span>
        </div>
        <div class="item">
          <span class="label">申请原因：</span>
          <span class="content">{{ applyInfo.applyResion }}</span>
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
import { getFundApply, getStudentsByVolunteerId } from '@/hooks'
import { editFeedBack, getFeedBack, getFundApplyByUserId } from '@/services'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const state = reactive({
      visible: false,
      reload: true,
      applyVisible: false,
      currentObj: {},
      applyInfo: {},
      feedback: {},
      pageIndex: 1,
      pageSize: 2,
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
        // isTrue: null,
        // feedback: null,
        // fileList: [],
        // material: [
        //   // {
        //   //   name: '测试',
        //   //   url: 'https://xpef.oss-cn-chengdu.aliyuncs.com/apply/visit/AI报告.docx'
        //   // }
        // ]
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
        volunteer: [
          {
            required: true,
            message: '家访志愿者姓名不能为空',
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
      getFeedback(record.id)
      state.visible = true
      state.currentObj = record
      console.log(record, 'user')
    }

    async function setInfo(userId) {
      try {
        const { errMsg, data, success } = await getFundApplyByUserId(userId)
        if (success === true) {
          state.applyInfo = data
          state.applyVisible = true
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    async function editFeedback(feedback) {
      try {
        const { errMsg, data, success } = await editFeedBack(feedback)
        if (success === true && data === true) {
          message.success('修改反馈表单成功')
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //根据学生id获取家访反馈信息
    async function getFeedback(userId) {
      try {
        const { errMsg, data, success } = await getFeedBack(userId)
        if (success === true) {
          if (data != null) {
            state.formState = data
            if (data.material != null) {
              state.reload = false
            }
          } else {
            state.formState = {
              studentName: state.currentObj.name,
              studentId: state.currentObj.id,
              highschool: state.currentObj.highSchool
            }
          }
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    //查看申请信息
    function applyBtn(record) {
      state.currentObj = record
      setInfo(record.id)
    }

    const handleChange = info => {
      const file = info.file
      const status = info.file.status
      if (status === 'done') {
        const res = file.response.data
        state.formState.material = res
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
          editFeedback(params)
        })
        .catch(error => {
          message.warning('请按规则完善字段')
        })
    }
    function changePage(pagination) {
      console.log(' data ')
      state.pageIndex = pagination.current
      state.pageSize = pagination.pageSize
      console.log(state.pageIndex)
    }

    function reloadBtn() {
      state.reload = true
    }

    return {
      ...toRefs(state),
      feedback,
      list,
      loading,
      applyBtn,
      onSubmit,
      formRef,
      handleChange,
      changePage,
      reloadBtn
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
