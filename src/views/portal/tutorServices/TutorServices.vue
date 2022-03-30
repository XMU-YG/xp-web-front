<template>
  <portalTemplate>
    <div class="main-content-box">
      <a-table
        :columns="columns"
        rowKey="id"
        :dataSource="dataSource"
        size="middle"
        :pagination="false"
      >
        <template #time="{ record }">
          <a-month-picker
            v-model:value="record.time"
            format="YYYY-MM"
            style="width: 100%"
            :disabledDate="disabledDate"
          >
          </a-month-picker>
        </template>
      </a-table>
    </div>
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
          width: '60px',
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

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less"></style>
