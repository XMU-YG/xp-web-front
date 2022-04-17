<template>
  <MainTemplate>
    <div>
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="list" tab="其他申请列表" :closable="false">
          <div class="table-wrap">
            <a-table
              class="custom-table"
              :scroll="{ x: true }"
              :dataSource="ApplyList"
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
                  <a style="color: red" @click="editBtn(record, '拒绝')"
                    >拒绝</a
                  >
                  <a style="color: green" @click="editBtn(record, '通过')"
                    >通过</a
                  >
                </a-space>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </MainTemplate>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { Modal } from 'ant-design-vue'
import { message } from 'ant-design-vue'
import MainTemplate from '@/components/mainTemplate/MainTemplate'
import { editOtherApplyStatus } from '@/services'
import { getAllFundApply, getOtherApplyByStatus } from '@/hooks'
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
          title: '申请类型',
          dataIndex: 'type',
          key: 'type',
          ellipsis: true
        },
        {
          title: '家访学校',
          dataIndex: 'externField',
          key: 'externField',
          ellipsis: true
        },
        {
          title: '申请状态',
          dataIndex: 'state',
          key: 'state',
          customRender: ({ text }) => {
            let color = undefined
            if (text === '已通过') {
              color = 'green'
            } else if (text === '未审核') {
              color = 'geekblue'
            } else {
              color = 'volcano'
            }
            return (
              <a-tag color={color} key={text}>
                {text}
              </a-tag>
            )
          },
          filters: [
            {
              text: '未审核',
              value: '未审核'
            },
            {
              text: '已通过',
              value: '已通过'
            },
            {
              text: '未通过',
              value: '未通过'
            }
          ],
          // specify the condition of filtering result
          // here is that finding the name started with `value`
          onFilter: (value, record) => record.state === value,
          ellipsis: true
        },
        {
          title: '提交时间',
          dataIndex: 'createTime',
          key: 'createTime',
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

    const { ApplyList, total, loading, setApplyList } = getOtherApplyByStatus()
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
            editStatus(row, 1)
          } else if (status === '拒绝') {
            editStatus(row, 2)
          }
        },
        onCancel: () => {
          Modal.destroyAll()
        }
      })
    }

    async function editStatus(row, status) {
      try {
        const { msg, data, success } = await editOtherApplyStatus(
          row.id,
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
      ApplyList,
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
