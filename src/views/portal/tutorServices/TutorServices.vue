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
      @ok="handleOk"
    >
      <a-table
        :columns="columnsReport"
        rowKey="id"
        :dataSource="dataSource"
        size="middle"
        :pagination="false"
      >
      </a-table>
    </a-modal>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
export default {
  components: {
    portalTemplate
  },
  setup() {
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
        }
      ],
      columns: [
        {
          title: '小平编号',
          dataIndex: 'number',
          key: 'number'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '联系电话',
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

    function lookReport(record) {
      state.visible = true
      state.currentObj = record
    }

    return {
      ...toRefs(state),
      lookReport
    }
  }
}
</script>

<style scoped lang="less"></style>
