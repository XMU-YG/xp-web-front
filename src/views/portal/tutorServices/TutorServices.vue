<template>
  <portalTemplate>
    <div class="nav">导师服务</div>
    <div class="main-content-box">
      <a-table
        :columns="columns"
        rowKey="id"
        :dataSource="dataSource"
        size="middle"
        :pagination="false"
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
        :dataSource="dataSource"
        size="middle"
        :pagination="false"
      >
        <template #operation="{ record }">
          <a @click="report(record)" style="text-decoration: underline"
            >成绩报告</a
          >
        </template>
      </a-table>
    </a-modal>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      visible: false,
      currentObj: {},
      columnsReport: [
        {
          title: '标题',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '作者',
          dataIndex: 'tel',
          key: 'tel'
        },
        {
          title: '上传时间',
          dataIndex: 'tel',
          key: 'tel'
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
          key: 'name'
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: '联系电话',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex'
        },
        {
          title: '年级',
          dataIndex: 'grade',
          key: 'grade'
        },
        {
          title: '大学',
          dataIndex: 'university',
          key: 'university'
        },
        {
          title: '专业',
          dataIndex: 'major',
          key: 'major'
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
      ]
    })

    //查看成绩报告按钮
    function lookReport(record) {
      state.visible = true
      state.currentObj = record
    }

    //成绩报告按钮
    function report() {
      let routeData = router.resolve({
        path: '/article-detail/' + 'ididididsafsdafdsafdsafd',
        query: { type: 'detail' }
      })
      window.open(routeData.href, '_blank')
    }

    return {
      ...toRefs(state),
      lookReport,
      report
    }
  }
}
</script>

<style scoped lang="less"></style>
