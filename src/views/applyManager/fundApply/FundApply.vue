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
                  <a style="color: blue" @click="detailBtn(record)">查看</a>
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
        <a-tab-pane
          key="detail"
          :tab="tabTitle"
          v-if="tabVisible"
          :closable="true"
        >
          <div
            class="
              ant-divider
              ant-divider-horizontal
              ant-divider-with-text
              ant-divider-with-text-left
              ant-divider-no-default-orientation-margin-left
            "
            role="separator"
          >
            <span class="ant-divider-inner-text" style="margin-left: 0px"
              >个人信息</span
            >
          </div>
          <div class="apply-box">
            <div class="item">
              <span class="label">姓名：</span>
              <span class="content">{{ formData.name }}</span>
            </div>
            <div class="item">
              <span class="label">性别：</span>
              <span class="content">7</span>
            </div>
            <div class="item">
              <span class="label">生源地：</span>
              <span class="content">5</span>
            </div>
            <div class="item">
              <span class="label">现居住地：</span>
              <span class="content">5</span>
            </div>
            <div class="item">
              <span class="label">高中学校：</span>
              <span class="content">3</span>
            </div>
            <div class="item">
              <span class="label">大学：</span>
              <span class="content">123123</span>
            </div>
            <div class="item">
              <span class="label">专业：</span>
              <span class="content">张三</span>
            </div>
          </div>
          <div
            class="
              ant-divider
              ant-divider-horizontal
              ant-divider-with-text
              ant-divider-with-text-left
              ant-divider-no-default-orientation-margin-left
            "
            role="separator"
          >
            <span class="ant-divider-inner-text" style="margin-left: 0px"
              >申请信息</span
            >
          </div>
          <div class="apply-box">
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
            <div class="item">
              <span class="label">申请材料：</span>
              <a class="content">点击下载</a>
            </div>
          </div>
          <div
            class="
              ant-divider
              ant-divider-horizontal
              ant-divider-with-text
              ant-divider-with-text-left
              ant-divider-no-default-orientation-margin-left
            "
            role="separator"
          >
            <span class="ant-divider-inner-text" style="margin-left: 0px"
              >家访反馈</span
            >
          </div>
          <div class="apply-box">
            <div class="item">
              <span class="label">情况是否属实：</span>
              <span class="content">是</span>
            </div>
            <div class="item">
              <span class="label">志愿者反馈：</span>
              <span class="content">水水水水</span>
            </div>
            <div class="item">
              <span class="label">家访志愿者：</span>
              <span class="content">嘻嘻嘻</span>
            </div>
            <div class="item">
              <span class="label">家访材料：</span>
              <a class="content">点击下载</a>
            </div>
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
import { getAllFundApply, getHighSchools } from '@/hooks'

export default defineComponent({
  components: {
    MainTemplate
  },
  setup() {
    const state = reactive({
      activeKey: 'list',
      pageIndex: 1,
      pageSize: 10,
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
          customRender: ({ text }) => {
            let color = undefined
            switch (text) {
              case '已通过':
                color = 'green'
                break
              case '未通过':
                color = 'LightGray'
                break
              case '审议':
                color = 'red'
                break
              default:
                color = 'geekblue'
            }
            return (
              <a-tag color={color} key={text}>
                {text}
              </a-tag>
            )
          },
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
      formData: {
        name: '叶刚',
        idNumber: '',
        mailbox: null,
        gender: null,
        ofStudent: null,
        session: null,
        tel: null,
        QQ: null,
        wx: null,
        address: null,
        studentTutor: null,
        hkTutor: null,
        highSchool: null,
        highSchoolAddress: null,
        university: null,
        major: null,
        scholastic: null,
        bankCard: null,
        bank: null,
        acountAddress: null
      },
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
