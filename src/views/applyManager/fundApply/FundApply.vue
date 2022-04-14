<template>
  <MainTemplate>
    <div>
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="list" tab="助学金申请列表" :closable="false">
          <div class="table-wrap">
            <a-table
              class="custom-table"
              :scroll="{ x: true }"
              :dataSource="fundApplyList"
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
                  <a-tag class="custom-tag" @click="detailBtn(record)"
                    >查看</a-tag
                  >
                  <a-tag class="custom-tag" @click="editBtn(record, '拒绝')"
                    >拒绝</a-tag
                  >
                  <a-tag
                    class="custom-tag custom-tag-waring"
                    @click="editBtn(record, '通过')"
                    >通过</a-tag
                  >
                </a-space>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
      <!-- <a-modal
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
      </a-modal> -->
    </div>
  </MainTemplate>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import MainTemplate from '@/components/mainTemplate/MainTemplate'
import { editFundApplyStatus, getFundApplyList } from '@/services'
import { getAllFundApply } from '@/hooks'
export default defineComponent({
  components: {
    MainTemplate
  },
  setup() {
    const state = reactive({
      activeKey: 'list',
      pageIndex: 1,
      pageSize: 10,
      search: {
        fileTitle: '',
        markFlag: null,
        markCreator: null,
        endCreateTime: null,
        startCreateTime: null
      },
      columns: [
        {
          title: '申请人',
          dataIndex: 'userName',
          key: 'name',
          fixed: 'left'
        },
        {
          title: '高中',
          dataIndex: 'highSchool',
          key: 'highSchool',
          ellipsis: true
        },
        {
          title: '年级',
          dataIndex: 'grade',
          key: 'grade',
          ellipsis: true
        },
        {
          title: '生源地',
          dataIndex: 'region',
          key: 'region',
          ellipsis: true
        },
        {
          title: '申请状态',
          dataIndex: 'status',
          key: 'status',
          ellipsis: true
        },
        {
          title: '提交时间',
          dataIndex: 'gmtCreated',
          key: 'gmtCreated',
          ellipsis: true
        },
        {
          title: '最近修改',
          dataIndex: 'gmtModified',
          key: 'gmtModified',
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

    const { fundApplyList, total, loading, setFundApplyList } =
      getAllFundApply()
    const formRef = ref()
    //编辑按钮
    function editBtn(row, status) {
      Modal.confirm({
        title: status + '申请',
        content: '你将' + status + '该学生助学金申请,请再次确认！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          if (status === '通过') {
            editStatus(row, 5)
          } else if (status === '拒绝') {
            editStatus(row, -1)
          }
          console.log(setFundApplyList())
        },
        onCancel: () => {
          Modal.destroyAll()
        }
      })
    }

    async function editStatus(row, status) {
      try {
        const { msg, data, success } = await editFundApplyStatus(
          row.id,
          row.userId,
          status
        )
        if (data === true) {
          message.success('修改成功')
        } else {
          message.warn('修改失败')
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //详情按钮
    function detailBtn(row) {
      state.tabVisible = true
      state.activeKey = 'detail'
      state.tabTitle = '申请详情 - ' + row.userName
      state.stuDetail = { ...row }
    }

    return {
      ...toRefs(state),
      formRef,
      fundApplyList,
      total,
      detailBtn,
      editBtn,
      loading
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
