<!-- 已受助学生 -->
<template>
  <div>
    <a-tabs type="card" v-model:activeKey="activeKey">
      <a-tab-pane key="list" tab="已受助学生" :closable="false">
        <div class="table-list-top">
          <div class="filter-box">
            <a-row style="width: 100%" :gutter="[24, 24]">
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">学生搜索：</span>
                  <a-input-search
                    v-model:value="search.name"
                    placeholder="请输入学生名字关键字"
                    @change="onchange"
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
                    v-model:value="search.sex"
                    ref="select"
                    style="width: 100%"
                    @change="onchange"
                    placeholder="请选择"
                  >
                    <a-select-option value="男">男</a-select-option>
                    <a-select-option value="女">女</a-select-option>
                  </a-select>
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">年级：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.grade"
                    ref="select"
                    style="width: 100%"
                    @change="onchange"
                    placeholder="请选择"
                  >
                    <a-select-option value="2014级">2014级</a-select-option>
                    <a-select-option value="2015级">2015级</a-select-option>
                    <a-select-option value="2016级">2016级</a-select-option>
                    <a-select-option value="2017级">2017级</a-select-option>
                    <a-select-option value="2018级">2018级</a-select-option>
                    <a-select-option value="2019级">2019级</a-select-option>
                    <a-select-option value="2020级">2020级</a-select-option>
                    <a-select-option value="2021级">2021级</a-select-option>
                  </a-select>
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">专业：</span>
                  <a-input-search
                    v-model:value="search.major"
                    placeholder="请输入专业名称关键字"
                    @change="onchange"
                    class="common-input"
                  />
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">所属高中：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.highSchool"
                    ref="select"
                    style="width: 100%"
                    @change="onchange"
                    placeholder="请选择"
                    showSearch
                    :filter-option="filterOptionHighSchool"
                  >
                    <a-select-option
                      v-for="item in highSchool"
                      :key="item.key"
                      :label="item.name"
                      :value="item.name"
                      >{{ item.name }}</a-select-option
                    >
                  </a-select>
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">所属大学：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.university"
                    ref="select"
                    style="width: 100%"
                    @change="onchange"
                    placeholder="请选择"
                    showSearch
                    :filter-option="filterOptionUniversity"
                  >
                    <a-select-option
                      v-for="item in university"
                      :key="item.key"
                      :label="item.name"
                      :value="item.name"
                      >{{ item.name }}</a-select-option
                    >
                  </a-select>
                </a-space>
              </a-col>
              <a-col :xxl="12" :xl="12">
                <a-space class="filter-space">
                  <span class="label">学年制：</span>
                  <a-select
                    class="common-select"
                    allow-clear
                    v-model:value="search.schoolYear"
                    ref="select"
                    style="width: 100%"
                    @change="onchange"
                    placeholder="请选择"
                  >
                    <a-select-option value="4">四年制</a-select-option>
                    <a-select-option value="5">五年制</a-select-option>
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
                @click="resetBtn"
              >
                <template #icon>
                  <my-icon type="icon-qingchucachu" style="font-size: 28px" />
                </template>
              </a-button>
              <a-button
                style="width: 60px; line-height: 32px"
                title="刷新"
                class="default-btn"
                @click="refreshBtn"
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
            :dataSource="alreadyStuList"
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
        <div class="detail-box">
          <div class="detail-title">
            <img
              alt=""
              src="../../../assets/images/data-icon.png"
              style="width: 70px; height: 70px"
            />
            <div class="name">
              <p>
                {{ stuDetail.xpNo }}-{{ stuDetail.name }}-20{{
                  stuDetail.grade
                }}届
              </p>
              <p>{{ stuDetail.university }}</p>
            </div>
          </div>
          <div class="detail-content">
            <div class="basic-info">
              <a-descriptions title="基本信息">
                <a-descriptions-item label="姓名">{{
                  stuDetail.name
                }}</a-descriptions-item>
                <a-descriptions-item label="电话">{{
                  stuDetail.phone
                }}</a-descriptions-item>
                <a-descriptions-item label="香港导师">
                  {{ stuDetail.hkMentorName }}
                </a-descriptions-item>
                <a-descriptions-item label="高中">{{
                  stuDetail.highSchool
                }}</a-descriptions-item>
                <a-descriptions-item label="生源地">{{
                  stuDetail.highSchRegion
                }}</a-descriptions-item>
              </a-descriptions>
            </div>
            <div class="detailed-info">
              <a-tabs type="card" v-model:activeKey="detailActiveKey">
                <a-tab-pane key="detailedInfo" tab="家庭情况">
                  <a-table
                    class="custom-table"
                    :scroll="{ x: true }"
                    :dataSource="alreadyStuList"
                    :columns="familyColumns"
                    :loading="familyLoading"
                  />
                </a-tab-pane>
                <a-tab-pane key="2" tab="银行信息"
                  >Content of Tab Pane 2</a-tab-pane
                >
                <a-tab-pane key="3" tab="申请信息"
                  >Content of Tab Pane 3</a-tab-pane
                >
              </a-tabs>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      v-model:visible="visible"
      title="编辑学生信息"
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
        <a-form-item label="管理员类型" name="isSystem">
          <a-radio-group v-model:value="formState.isSystem">
            <a-radio value="0">非管理员</a-radio>
            <a-radio value="1">普通管理员</a-radio>
            <a-radio value="2">超级管理员</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="是否设置为学生导师" name="isMentor">
          <a-radio-group v-model:value="formState.isMentor">
            <a-radio value="1">是</a-radio>
            <a-radio value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="学生导师" name="stuMentorId">
          <a-select
            v-model:value="formState.stuMentorId"
            placeholder="请选择学生导师"
            showSearch
            :filter-option="filterOptionStuMentor"
          >
            <a-select-option
              v-for="item in stuMentors"
              :key="item.key"
              :label="item.name"
              :value="item.name"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
        <a-form-item label="香港导师" name="hkMentorId">
          <a-select
            v-model:value="formState.hkMentorId"
            placeholder="请选择香港导师"
            showSearch
            :filter-option="filterOptionHkMentor"
          >
            <a-select-option
              v-for="item in hkMentors"
              :key="item.key"
              :label="item.name"
              :value="item.name"
              >{{ item.name }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import { useAlreadyStuList } from '@/hooks/index'
import {
  deleteAlreadyStu,
  putAlreadyStu,
  getUniversityNames,
  getHighSchoolNames,
  getHkMentors,
  getStuMentors
} from '@/services/index'
export default defineComponent({
  setup() {
    const state = reactive({
      activeKey: 'list',
      pageIndex: 1,
      pageSize: 10,
      search: {
        name: '',
        sex: null,
        grade: null,
        major: null,
        highSchool: null,
        university: null,
        schoolYear: null
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
          ellipsis: true,
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
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
          ellipsis: true,
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
          ellipsis: true,
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
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
      familyColumns: [
        {
          title: '亲属姓名',
          dataIndex: 'name',
          key: 'name',
          ellipsis: true
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
          ellipsis: true
        },
        {
          title: '与申请人关系',
          dataIndex: 'contection',
          key: 'contection',
          ellipsis: true
        },
        {
          title: '是否与申请人同住',
          dataIndex: 'region',
          key: 'region',
          ellipsis: true
        },
        {
          title: '职业',
          dataIndex: 'stuMentorName',
          key: 'stuMentorName',
          ellipsis: true,
          customRender: ({ text }) => {
            if (text === null || text === '') {
              return '-'
            } else {
              return text
            }
          }
        },
        {
          title: '身体健康状况',
          dataIndex: 'hkMentorName',
          key: 'hKMentorName',
          ellipsis: true
        },
        {
          title: '年收入',
          dataIndex: 'university',
          key: 'university',
          ellipsis: true
        }
      ],
      panes: [],
      visible: false,
      formState: {
        name: '',
        isSystem: undefined,
        isMentor: undefined,
        stuMentorId: undefined,
        hkMentorId: undefined
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
        hkMentorId: [
          {
            required: true,
            message: '请选择香港导师',
            type: 'string',
            trigger: ['blur', 'change']
          }
        ]
      },
      tabVisible: false,
      tabTitle: '',
      detailActiveKey: 'detailedInfo',
      stuDetail: {},
      university: [],
      highSchool: [],
      hkMentors: [],
      stuMentors: []
    })

    const { alreadyStuList, total, loading, setAlreadyStuList } =
      useAlreadyStuList()

    onMounted(() => {
      getUniversity()
      getHighSchool()
    })

    //关键字搜索大学名字
    const filterOptionUniversity = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    //关键字搜索高中名字
    const filterOptionHighSchool = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    //关键字搜索高中名字
    const filterOptionStuMentor = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    //关键字搜索高中名字
    const filterOptionHkMentor = (input, option) => {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    //筛选项change时
    function onchange() {
      state.pageIndex = 1
      refreshBtn()
    }

    //刷新按钮
    function refreshBtn() {
      const params = {
        pageIndex: state.pageIndex,
        pageSize: state.pageSize,
        name: state.search.name,
        sex: state.search.sex,
        grade: state.search.grade,
        major: state.search.major,
        highSchool: state.search.highSchool,
        university: state.search.university,
        schoolYear: state.search.schoolYear
      }
      setAlreadyStuList(params)
    }

    function resetBtn() {
      state.pageIndex = 1
      state.pageSize = 10
      state.search.name = ''
      state.search.sex = undefined
      state.search.grade = undefined
      state.search.major = undefined
      state.search.highSchool = undefined
      state.search.university = undefined
      state.search.schoolYear = undefined
      refreshBtn()
    }

    //获取大学学校列表
    async function getUniversity() {
      try {
        const { msg, data, success } = await getUniversityNames()
        if (success === true) {
          state.university = data
        } else {
          message.warn(msg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    //获取高中学校列表
    async function getHighSchool() {
      try {
        const { msg, data, success } = await getHighSchoolNames()
        if (success === true) {
          state.highSchool = data
        } else {
          message.warn(msg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //获取香港导师列表
    async function getHkMentor() {
      try {
        const { msg, data, success } = await getHkMentors()
        if (success === true) {
          state.hkMentors = data.list
        } else {
          message.warn(msg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }
    //获取学生导师列表
    async function getStuMentor() {
      try {
        const { msg, data, success } = await getStuMentors()
        if (success === true) {
          state.stuMentors = data.list
        } else {
          message.warn(msg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const formRef = ref()
    //验证及保存
    const okBtn = () => {
      formRef.value
        .validate()
        .then(() => {
          submitInfo()
        })
        .catch(() => {
          message.warning('请按规则完善字段')
        })
    }

    //提交编辑信息
    async function submitInfo() {
      const params = {
        name: state.formState.name,
        isSystem: state.formState.isSystem,
        isMentor: state.formState.isMentor,
        stuMentorId: state.formState.stuMentorId,
        hkMentorId: state.formState.hkMentorId
      }
      let aaa = JSON.stringify(params)
      console.log(aaa)
      const { msg, success } = await putAlreadyStu(aaa)
      if (success === true) {
        message.success('修改成功')
        state.visible = false
      } else {
        message.warn(msg)
      }
    }

    //详情按钮
    function detailBtn(row) {
      state.tabVisible = true
      state.activeKey = 'detail'
      state.tabTitle = '学生详情 - ' + row.name
      state.stuDetail = { ...row }
    }

    //编辑按钮
    function editBtn(row) {
      state.visible = true
      state.formState.name = row.name
      getStuMentor()
      getHkMentor()
    }

    //删除按钮
    function deleteBtn(row) {
      Modal.confirm({
        title: '删除学生信息',
        content: '确认删除该学生吗？删除后学生信息将不存在！',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          deleteStu(row.id)
        },
        onCancel: () => {
          Modal.destroyAll()
        }
      })
    }

    //删除事件
    async function deleteStu(id) {
      const { success } = await deleteAlreadyStu(id)
      if (success) {
        message.success('删除成功')
        refreshBtn()
      } else {
        message.warning('删除失败')
      }
    }

    return {
      ...toRefs(state),
      detailBtn,
      okBtn,
      formRef,
      editBtn,
      deleteBtn,
      alreadyStuList,
      total,
      loading,
      refreshBtn,
      resetBtn,
      onchange,
      filterOptionUniversity,
      filterOptionHighSchool,
      filterOptionStuMentor,
      filterOptionHkMentor
    }
  }
})
</script>

<style scoped lang="less">
/* @import url(); 引入css类 */
.detail-box {
  width: 1020px;
  margin: 0 auto;
  .detail-title {
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
  .detail-content {
    .basic-info {
    }
    .detailed-info {
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
