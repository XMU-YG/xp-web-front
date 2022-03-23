<!-- 预受助学生管理 -->
<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="list" tab="预计受助学生管理" :closable="false">
        <div class="table-list-top">
          <div class="filter-box">
            <a-row style="width: 100%" :gutter="[24, 24]">
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">学生搜索：</span>
                  <a-input-search
                    v-model:value="search.fileTitle"
                    placeholder="请输入学生名字关键字"
                    @search="getTableData"
                    class="common-input"
                  />
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">性别：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.markFlag"
                    ref="select"
                    style="width: 100%"
                    @change="flagChange"
                    placeholder="请选择"
                  >
                    <a-select-option value="true">男</a-select-option>
                    <a-select-option value="false">女</a-select-option>
                  </a-select>
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">年级：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.markFlag"
                    ref="select"
                    style="width: 100%"
                    @change="flagChange"
                    placeholder="请选择"
                  >
                    <a-select-option value="true">2017级</a-select-option>
                    <a-select-option value="false">2018级</a-select-option>
                  </a-select>
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">所属高中：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.markFlag"
                    ref="select"
                    style="width: 100%"
                    @change="flagChange"
                    placeholder="请选择"
                  >
                    <a-select-option value="true">计算机大类</a-select-option>
                    <a-select-option value="false">医学大类</a-select-option>
                  </a-select>
                </a-space>
              </a-col>
            </a-row>
          </div>
          <div class="function-box">
            <a-space>
              <a-button
                style="width: 60px; line-height: 32px"
                title="重置"
                class="default-btn"
                @click="reloadTable"
              >
                <template #icon>
                  <my-icon type="icon-qingchucachu" style="font-size: 28px" />
                </template>
              </a-button>
              <a-button
                style="width: 60px; line-height: 32px"
                title="刷新"
                class="default-btn"
                @click="reloadTable"
              >
                <template #icon>
                  <RedoOutlined style="font-size: 16px" />
                </template>
              </a-button>
              <a-popover placement="bottom">
                <template #content>
                  <div>
                    <a type="primary">批量通过</a>
                  </div>
                  <div>
                    <a type="primary">批量删除</a>
                  </div>
                </template>
                <a-button type="primary">批量操作</a-button>
              </a-popover>
            </a-space>
          </div>
        </div>
        <div class="table-wrap">
          <a-table
            class="custom-table"
            :scroll="{ x: true }"
            :dataSource="notStuList"
            :columns="columns"
            :loading="loading"
            :pagination="{
              current: pageIndex,
              pageSize: pageSize,
              total: total,
              showTotal: infoTotal => `共${infoTotal}条`,
              showQuickJumper: true,
              onChange: changePage
            }"
          >
            <template #markFlag="{ text }">
              <PushpinFilled v-if="text === false" />
              <PushpinFilled v-else style="color: #f37b6b" />
            </template>
            <template #operation="{ record }">
              <a-space>
                <a-tag class="custom-tag" @click="detailBtn(record)"
                  >资助</a-tag
                >
                <a-tag class="custom-tag" @click="detailBtn(record)"
                  >详情</a-tag
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
      <a-tab-pane key="detail" :tab="tabTitle" v-if="tabVisible">
        <div class="detail-box">
          <div class="detail-title">
            <div class="left">
              <img
                alt=""
                src="../../../assets/images/data-icon.png"
                style="width: 70px; height: 70px"
              />
              <div class="name">
                <p>XPF123-张荣美-2017届</p>
                <p>关岭名族高级中学</p>
              </div>
            </div>
            <div class="right">
              <a-button type="primary" @click="approveBtn">审核</a-button>
            </div>
          </div>
          <div class="detail-content">
            <div class="steps">
              <a-steps :current="1" status="error">
                <a-step title="Finished" description="学生申请资料审核" />
                <a-step title="In Progress" description="家访资料审核" />
                <a-step title="Waiting" description="申请结果" />
              </a-steps>
            </div>
            <div class="info">
              <a-tabs type="card" v-model:activeKey="detailActiveKey">
                <a-tab-pane key="detailedInfo" tab="申请资料">
                  申请资料申请资料申请资料申请资料申请资料
                </a-tab-pane>
                <a-tab-pane key="2" tab="家访资料"
                  >家访资料家访资料家访资料家访资料</a-tab-pane
                >
              </a-tabs>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      v-model:visible="visible"
      title="审核信息"
      width="500px"
      @ok="okBtn"
    >
      <a-form
        ref="formRef"
        :model="formState"
        :rules="rules"
        style="width: 100%"
      >
        <a-form-item label="学生" name="name">
          <a-input v-model:value="formState.name" disabled />
        </a-form-item>
        <a-form-item label="是否通过" name="isPass">
          <a-radio-group v-model:value="formState.isPass">
            <a-radio value="1">是</a-radio>
            <a-radio value="2">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="审批意见" name="desc">
          <a-textarea v-model:value="formState.desc" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import { useNotStuList } from '@/hooks'
export default defineComponent({
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
          title: '小平编号',
          dataIndex: 'xpNo',
          key: 'xpNo',
          slots: { customRender: 'xpNo' },
          width: '100',
          fixed: 'left'
        },
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          ellipsis: true
        },
        {
          title: '届',
          dataIndex: 'grade',
          key: 'grade',
          ellipsis: true
        },
        {
          title: '地区',
          dataIndex: 'region',
          key: 'region',
          ellipsis: true
        },
        {
          title: '高中学校',
          dataIndex: 'highSchool',
          key: 'highSchool',
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          slots: { customRender: 'operation' },
          fixed: 'right'
        }
      ],
      panes: [],
      visible: false,
      formState: {
        name: '',
        isPass: undefined,
        desc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '学生不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          },
          {
            max: 100,
            message: '学生名字长度不可超过100',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        isPass: [
          {
            required: true,
            message: '请确认审核是否通过',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ],
        desc: [
          {
            required: true,
            message: '审核意见不能为空',
            type: 'string',
            trigger: ['blur', 'change']
          },
          {
            max: 1000,
            message: '审核意见不能超过1000！',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ]
      },
      tabVisible: false,
      tabTitle: '',
      detailActiveKey: 'detailedInfo'
    })

    const { notStuList, total, loading, setNotStuList } = useNotStuList()

    const formRef = ref()
    //验证及保存
    const okBtn = () => {
      formRef.value
        .validate()
        .then(() => {
          // submitDir()
        })
        .catch(() => {
          message.warning('请按规则完善字段')
        })
    }

    const remove = targetKey => {
      let lastIndex = 0
      state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1
        }
      })
      state.panes = state.panes.filter(pane => pane.key !== targetKey)

      if (state.panes.length && state.activeKey === targetKey) {
        if (lastIndex >= 0) {
          state.activeKey = state.panes[lastIndex].key
        } else {
          state.activeKey = state.panes[0].key
        }
      }
      state.activeKey = 'list'
    }

    //详情按钮
    function detailBtn(row) {
      state.tabVisible = true
      state.activeKey = 'detail'
      state.tabTitle = '学生详情 - ' + row.name
    }

    //删除按钮
    function deleteBtn(row) {
      Modal.confirm({
        title: '删除学生信息',
        content: '确认删除该学生吗？删除后学生信息将不存在！',
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
    //审批按钮
    function approveBtn() {
      state.visible = true
    }

    return {
      ...toRefs(state),
      detailBtn,
      okBtn,
      formRef,
      deleteBtn,
      approveBtn,
      notStuList,
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
