<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="list" tab="成绩管理" :closable="false">
        <div class="table-list-top">
          <div class="filter-box">
            <a-row style="width: 100%" :gutter="[24, 24]">
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">学生搜索：</span>
                  <a-input-search
                    v-model:value="search.fileTitle"
                    placeholder="请输入学生名字/所属大学关键字"
                    @search="getTableData"
                    class="common-input"
                  />
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
                  <span class="label">专业：</span>
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
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">高中学校：</span>
                  <a-input-search
                    v-model:value="search.markCreator"
                    placeholder="请输入高中学校关键字"
                    @search="getTableData"
                    class="common-input"
                  />
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
            </a-space>
          </div>
        </div>
        <div class="table-wrap">
          <a-table
            class="custom-table"
            :scroll="{ x: true }"
            :dataSource="dataList"
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
                  >详情</a-tag
                >
                <a-tag class="custom-tag" @click="editBtn(record)">编辑</a-tag>
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
        <div class="content">
          <div class="title">
            <img
              alt=""
              src="../../../assets/images/data-icon.png"
              style="width: 70px; height: 70px"
            />
            <div class="detail-title">
              <p class="title">张荣美aaaaaaa</p>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      v-model:visible="visible"
      title="编辑学生信息"
      width="500px"
      @ok="editOk"
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
        <a-form-item label="是否设置为管理员" name="isAdministrators">
          <a-radio-group v-model:value="formState.isAdministrators">
            <a-radio value="1">是</a-radio>
            <a-radio value="2">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否设置为学生导师" name="isTutor">
          <a-radio-group v-model:value="formState.isTutor">
            <a-radio value="1">是</a-radio>
            <a-radio value="2">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="学生导师" name="studentTutor">
          <a-select
            v-model:value="formState.studentTutor"
            placeholder="请选择学生导师"
          >
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="香港导师" name="HKTutor">
          <a-select
            v-model:value="formState.HKTutor"
            placeholder="请选择香港导师"
          >
            <a-select-option value="shanghai">Zone one</a-select-option>
            <a-select-option value="beijing">Zone two</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
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
          title: '学生导师',
          dataIndex: 'stuMentorName',
          key: 'stuMentorName',
          ellipsis: true
        },
        {
          title: '香港导师',
          dataIndex: 'hkMentorName',
          key: 'hKMentorName',
          ellipsis: true
        },
        {
          title: '大学',
          dataIndex: 'university',
          key: 'university',
          ellipsis: true
        },
        {
          title: '年制',
          dataIndex: 'schoolYear',
          key: 'schoolYear',
          ellipsis: true
        },
        {
          title: '专业',
          dataIndex: 'major',
          key: 'major',
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
      dataList: [
        {
          id: '134adf36547fdghg658',
          key: '13436547fdghg658',
          xpNo: 'xp123',
          name: '张荣美1',
          sex: '女',
          grade: '2017届',
          stuMentorName: '-',
          hkMentorName: '區叔叔',
          university: '贵州大学',
          schoolYear: '四年制',
          major: '网络工程',
          highSchool: '关岭民族高级中学'
        },
        {
          id: '134adf36547fdghg658',
          key: '134adf36547fdghg658',
          xpNo: 'xp123',
          name: '张荣美2',
          sex: '女',
          grade: '2017届',
          stuMentorName: '-',
          hkMentorName: '區叔叔',
          university: '贵州大学',
          schoolYear: '四年制',
          major: '网络工程',
          highSchool: '关岭民族高级中学'
        },
        {
          id: '134adf36dghg658',
          key: '134adf3hg658',
          xpNo: 'xp123',
          name: '张荣美3',
          sex: '女',
          grade: '2017届',
          stuMentorName: '-',
          hkMentorName: '區叔叔',
          university: '贵州大学',
          schoolYear: '四年制',
          major: '网络工程',
          highSchool: '关岭民族高级中学'
        }
      ],
      panes: [],
      visible: false,
      formState: {
        name: '',
        isAdministrators: undefined,
        isTutor: undefined,
        studentTutor: undefined,
        HKTutor: undefined
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
        HKTutor: [
          {
            required: true,
            message: '请选择香港导师',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ]
      },
      tabVisible: false,
      tabTitle: ''
    })

    const formRef = ref()
    //验证及保存
    const editOk = () => {
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

    //编辑按钮
    function editBtn(row) {
      state.visible = true
      state.formState.name = row.name
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

    return {
      ...toRefs(state),
      detailBtn,
      editOk,
      formRef,
      editBtn,
      deleteBtn
    }
  }
})
</script>

<style scoped lang="less">
/* @import url(); 引入css类 */
.wrapper {
}
</style>
