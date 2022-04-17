<template>
  <MainTemplate>
    <div>
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane key="list" tab="学生导师列表" :closable="false">
          <div class="table-wrap">
            <a-table
              class="custom-table"
              :scroll="{ x: true }"
              :dataSource="stuMentorList"
              :columns="columns"
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
              <template #markFlag="{ text }">
                <PushpinFilled v-if="text === false" />
                <PushpinFilled v-else style="color: #f37b6b" />
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
import { getStuMentorList } from '@/hooks'
import MainTemplate from '@/components/mainTemplate/MainTemplate'
export default defineComponent({
  components: {
    MainTemplate
  },
  setup() {
    const state = reactive({
      activeKey: 'list',
      pageIndex: 1,
      pageSize: 5,
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
          dataIndex: 'name',
          key: 'name',
          ellipsis: true
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
          ellipsis: true
        }
      ],
      panes: [],
      visible: false,
      formState: {
        name: '',
        isPass: undefined,
        desc: ''
      },
      tabVisible: false,
      tabTitle: '',
      detailActiveKey: 'detailedInfo'
    })

    const { stuMentorList, total, loading, setStuMentorList } =
      getStuMentorList()
    const formRef = ref()
    //删除按钮
    function deleteBtn(row) {
      Modal.confirm({
        title: '取消管理员权限',
        content: '确认取消该人管理员权限吗？',
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
    function changePage(pagination) {
      state.loading = false
      state.pageIndex = pagination.current
      state.pageSize = pagination.pageSize
      state.stuMentorList = getStuMentorList({
        pageIndex: pagination.current,
        pageSize: pagination.pageSize
      }).stuMentorList
    }
    return {
      ...toRefs(state),
      formRef,
      deleteBtn,
      changePage,
      stuMentorList,
      total,
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
