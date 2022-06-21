<template>
  <portalTemplate>
    <div class="nav">导师服务</div>
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
        <template #operation="{ record }">
          <a @click="lookReport(record)" style="text-decoration: underline"
            >查看成绩报告</a
          >
        </template>
      </a-table>
    </div>
    <a-modal
      width="800px"
      v-model:visible="visible"
      title="已提交成绩报告"
      :footer="null"
    >
      <a-table
        :columns="columnsReport"
        rowKey="id"
        :loading="rloading"
        :dataSource="reports"
        size="middle"
        :pagination="false"
      >
        <template #operation="{ record }">
          <a @click="report(record)" style="text-decoration: underline">查看</a>
        </template>
      </a-table>
    </a-modal>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
import { getStudentsByMentorId } from '@/hooks'
import LocalSave from '@/utils/localSave'
import { getReportsByUserId } from '@/services'
import { message } from 'ant-design-vue'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      visible: false,
      pageIndex: 1,
      reports: [],
      pageSize: 5,
      currentObj: {},
      columnsReport: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '作者',
          dataIndex: 'writer',
          key: 'writer',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '上传时间',
          dataIndex: 'gmtCreate',
          key: 'gmtCreate',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: '140px',
          fixed: 'right',
          slots: { customRender: 'operation' }
        }
      ],
      columns: [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
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
          title: '年级',
          dataIndex: 'grade',
          key: 'grade',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '大学',
          dataIndex: 'university',
          key: 'university',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '专业',
          dataIndex: 'major',
          key: 'major',
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: '140px',
          fixed: 'right',
          slots: { customRender: 'operation' }
        }
      ]
    })

    async function getReport(userId) {
      try {
        state.rloading = true
        const { errMsg, data, success } = await getReportsByUserId(userId)
        state.rloading = false
        if (success === true) {
          state.reports = data
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //查看成绩报告按钮
    function lookReport(record) {
      state.visible = true
      state.currentObj = record
      getReport(record.id)
    }
    const { list, loading, setList } = getStudentsByMentorId(
      LocalSave.getJson('cookieUser').id
    )

    //成绩报告按钮
    function report(record) {
      let routeData = router.resolve({
        path: '/article-detail/' + record.id
      })
      window.open(routeData.href, '_blank')
    }

    function changePage(pagination) {
      console.log(' data ')
      state.pageIndex = pagination.current
      state.pageSize = pagination.pageSize
      console.log(state.pageIndex)
    }

    return {
      ...toRefs(state),
      lookReport,
      report,
      list,
      loading,
      changePage
    }
  }
}
</script>

<style scoped lang="less"></style>
