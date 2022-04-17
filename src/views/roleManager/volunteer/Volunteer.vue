<template>
  <MainTemplate>
    <div>
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="list" tab="志愿者管理" :closable="false">
          <div class="table-wrap">
            <a-table
              class="custom-table"
              :scroll="{ x: true }"
              :dataSource="volunteerList"
              :columns="columns"
              :loading="loading"
              :pagination="{
                current: pageIndex,
                pageSize: pageSize,
                total: total,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '50'], //每页中显示的数据
                showTotal: infoTotal => `共${infoTotal}条`,
                showQuickJumper: true
              }"
            >
              <template #markFlag="{ text }">
                <PushpinFilled v-if="text === false" />
                <PushpinFilled v-else style="color: #f37b6b" />
              </template>
              <template #operation="{ record }">
                <a-space>
                  <a-tag class="custom-tag" @click="editBtn(record)"
                    >编辑</a-tag
                  >
                  <a-tag
                    class="custom-tag custom-tag-waring"
                    @click="deleteBtn(record)"
                    >删除</a-tag
                  >
                </a-space>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <a-modal
        v-model:visible="visible"
        title="编辑志愿者信息"
        width="500px"
        @ok="okBtn"
      >
        <a-form
          ref="formRef"
          :model="formState"
          :rules="rules"
          style="width: 100%"
        >
          <a-form-item label="志愿者姓名" name="name">
            <a-input v-model:value="formState.name" disabled />
          </a-form-item>
          <a-form-item label="是否设置为负责人" name="isLeader">
            <a-radio-group v-model:value="formState.isLeader">
              <a-radio value="1">是</a-radio>
              <a-radio value="0">否</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="志愿者类型" name="type">
            <a-select v-model:value="formState.type" showSearch>
              <a-select-option
                v-for="item in types"
                :key="item.key"
                :label="item.name"
                :value="item.name"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
          <a-form-item
            v-if="formState.type === '家访志愿者'"
            label="家访学校"
            name="highSchool"
          >
            <a-select
              v-model:value="formState.visitSchool"
              showSearch
              :filter-option="filterOptionHighSchool"
            >
              <a-select-option
                v-for="item in highSchools"
                :key="item.key"
                :label="item.name"
                :value="item.name"
                >{{ item.name }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </MainTemplate>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import { getVolunteerLists } from '@/hooks'
import MainTemplate from '@/components/mainTemplate/MainTemplate'
import { editVolunteer, getHighSchoolNames } from '@/services'
export default defineComponent({
  components: {
    MainTemplate
  },
  setup() {
    const state = reactive({
      activeKey: 'list',
      pageIndex: 1,
      pageSize: 10,
      types: [
        {
          key: 1,
          name: '家访志愿者'
        }
      ],
      highSchools: [],
      search: {
        fileTitle: '',
        markFlag: null,
        markCreator: null,
        endCreateTime: null,
        startCreateTime: null
      },
      columns: [
        {
          title: '姓名',
          dataIndex: 'userName',
          key: 'name',
          fixed: 'left'
        },
        {
          title: '志愿者类型',
          dataIndex: 'type',
          key: 'type',
          ellipsis: true
        },
        {
          title: '家访学校',
          dataIndex: 'visitSchool',
          key: 'visitSchool',
          ellipsis: true
        },
        {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          ellipsis: true
        },
        {
          title: '负责人',
          dataIndex: 'isLeader',
          key: 'isLeader',
          ellipsis: true,
          customRender: ({ text }) => {
            if (text === null || text === 0) {
              return '否'
            } else {
              return '是'
            }
          }
        },
        {
          title: '有效时间',
          dataIndex: 'legalTime',
          key: 'legalTime',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          slots: { customRender: 'operation' }
        }
      ],
      panes: [],
      visible: false,
      formState: {
        name: '',
        type: '',
        visitSchool: '',
        isLeader: 0
      },
      tabVisible: false,
      tabTitle: '',
      detailActiveKey: 'detailedInfo'
    })

    const { volunteerList, total, loading, setVolunteerList } =
      getVolunteerLists()
    const formRef = ref()
    //编辑按钮
    function editBtn(row) {
      getHighSchool()
      state.visible = true
      state.formState.name = row.userName
      state.formState.type = row.type
      state.formState.visitSchool = row.visitSchool
      state.formState.isLeader = row.isLeader
      state.formState.id = row.id
    }
    //关键字搜索高中名字
    const filterOptionHighSchool = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    //获取高中学校列表
    async function getHighSchool() {
      try {
        const { msg, data, success } = await getHighSchoolNames()
        if (success === true) {
          state.highSchools = data
        } else {
          message.warn(msg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //修改志愿者信息
    async function editVolunteerInfo(info) {
      try {
        const { errMsg, data, success } = await editVolunteer(info)
        if (success === true && data === true) {
          message.success('修改成功')
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //删除按钮
    function deleteBtn(row) {
      Modal.confirm({
        title: '删除志愿者',
        content: '确认删除该志愿者吗？该操作不影响学生信息',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          // userApplyAuth(apiId)
        },
        onCancel: () => {
          Modal.destroyAll()
        }
      })
    }
    function okBtn() {
      console.log(state.formState)
      editVolunteerInfo(state.formState)
    }

    return {
      ...toRefs(state),
      formRef,
      deleteBtn,
      volunteerList,
      total,
      editBtn,
      loading,
      filterOptionHighSchool,
      getHighSchool,
      okBtn
    }
  }
})
</script>

<style scoped lang="less">
/* @import url(); 引入css类 */
.detail-box {
  width: 1020px;
  margin: 0 auto 20px;
  .detail-title {
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      img {
        margin-right: 20px;
      }
      .name {
        p {
          margin-top: 8px;
        }
      }
    }
  }
  .detail-content {
    .steps {
      width: 800px;
      margin: 40px auto;
    }
    .info {
      margin-top: 20px;
      /deep/
        .ant-tabs-top-content.ant-tabs-card-content.ant-tabs-content.ant-tabs-content-no-animated {
        border: 1px solid #f0f0f0;
        border-top: none;
      }
    }
  }
}
/deep/.ant-space-item span.label {
  display: inline-block;
  width: 70px;
  text-align: right;
}
</style>
