<template>
  <portalTemplate>
    <div class="nav">个人主页</div>
    <div class="main-content-box">
      <a-form ref="myForm" :rules="rules" :model="formData">
        <div class="pohto-box">
          <a-image :src="formData.avatar"></a-image>
          <a-upload
            @change="handleChange"
            v-if="!isDetail"
            action="/api/file/upload?path=dbfile/temp"
          >
            <a-button>
              <upload-outlined></upload-outlined>
              上传
            </a-button>
          </a-upload>
        </div>
        <!-- <a-form-item label="头像图片" name="img" v-else>
          <a-upload
            v-model:file-list="fileList"
            name="profile"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="/api/talent-manager/upload/profile"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              alt="avatar"
              style="width: 86px; height: 86px; object-fit: cover; flex: 1"
            />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
        </a-form-item> -->
        <div class="item-box">
          <div class="title">
            <img src="../../../assets/images/jinqi.png" alt="" />
            <span>基本信息</span>
          </div>
          <div class="item-content">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="姓名" name="name">
                  <a-input
                    allow-clear
                    v-model:value="formData.name"
                    disabled="true"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="身份证号" name="idCard">
                  <a-input
                    allow-clear
                    v-model:value="formData.idCard"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="邮箱" name="email">
                  <a-input
                    allow-clear
                    v-model:value="formData.email"
                    disabled="true"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="性别" name="sex">
                  <a-input
                    allow-clear
                    v-model:value="formData.sex"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="生源地" name="region">
                  <a-input
                    v-model:value="formData.region"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="届" name="grade">
                  <a-input
                    allow-clear
                    v-model:value="formData.grade"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="电话" name="phone">
                  <a-input
                    allow-clear
                    v-model:value="formData.phone"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="QQ" name="QQ">
                  <a-input
                    allow-clear
                    v-model:value="formData.qq"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="微信" name="wx">
                  <a-input
                    allow-clear
                    v-model:value="formData.weixin"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="现居住地" name="living">
                  <a-input
                    v-model:value="formData.living"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="学生导师" name="stuMentorName">
                  <a-input
                    allow-clear
                    v-model:value="formData.stuMentorName"
                    disabled="true"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="香港导师" name="hkTutor">
                  <a-input
                    allow-clear
                    v-model:value="formData.hkMentorName"
                    disabled="true"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="item-box">
          <div class="title">
            <img src="../../../assets/images/jinqi.png" alt="" />
            <span>学校信息</span>
          </div>
          <div class="item-content">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="高中学校" name="highSchool">
                  <a-input
                    allow-clear
                    v-model:value="formData.highSchool"
                    disabled="true"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="高中学校地址" name="highSchRegion">
                  <a-input
                    v-model:value="formData.highSchRegion"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="大学" name="university">
                  <a-input
                    allow-clear
                    v-model:value="formData.university"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="专业" name="major">
                  <a-input
                    allow-clear
                    v-model:value="formData.major"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="学年制" name="schoolYear">
                  <a-input-number
                    style="width: 100%"
                    :disabled="isDetail"
                    v-model:value="formData.schoolYear"
                    :min="0"
                    :max="10"
                    :step="1"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="item-box">
          <div class="title">
            <img src="../../../assets/images/jinqi.png" alt="" />
            <span>银行卡信息</span>
          </div>
          <div class="item-content">
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="银行卡卡号" name="bankCardNo">
                  <a-input
                    allow-clear
                    v-model:value="formData.bankCardNo"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="银行名称" name="bankName">
                  <a-input
                    allow-clear
                    v-model:value="formData.bankName"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="开户行地址" name="bankAddress">
                  <a-input
                    v-model:value="formData.bankAddress"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </div>
        </div>
        <div class="btn-box">
          <a-space>
            <a-button type="primary" v-if="isDetail" @click="editBtn"
              >编辑</a-button
            >
            <template v-else>
              <a-button @click="cancelBtn">取消</a-button>
              <a-button type="primary" @click="submitBtn">保存</a-button>
            </template>
          </a-space>
        </div>
      </a-form>
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, toRefs, ref, onMounted } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import SelectTree from './components/SelectTree'
import { message } from 'ant-design-vue'
import { getUsersbyIds, putAlreadyStu } from '@/services'
import LocalSave from '@/utils/localSave'
import router from '@/router'
import { useRouter } from 'vue-router'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      isDetail: true,
      fileList: [],
      imgUrl: 'https://xpef.oss-cn-chengdu.aliyuncs.com/images/avatar.png',
      sex: 0,
      formData: {},
      rules: {},
      tree: [
        {
          id: 'dfdsagfdsagfasdg',
          name: '河南省',
          label: '河南省',
          value: 'dfdsagfdsagfasdg',
          title: '河南省',
          type: 'ofStudent',
          children: [
            {
              id: 'agadfgdfg',
              name: '驻马店市',
              label: '驻马店市',
              value: 'agadfgdfg',
              title: '驻马店市',
              type: 'ofStudent',
              children: [
                {
                  id: 'dgfdfsgfdgf',
                  name: '平舆县',
                  label: '平舆县',
                  value: 'dgfdfsgfdgf',
                  title: '平舆县',
                  type: 'ofStudent',
                  children: null
                },
                {
                  id: 'wetrewvcdbv',
                  name: '新蔡县',
                  label: '新蔡县',
                  value: 'wetrewvcdbv',
                  title: '新蔡县',
                  type: 'ofStudent',
                  children: null
                }
              ]
            },
            {
              id: 'adfsfdsa',
              name: '漯河市afdsf',
              label: '漯河市afdsf',
              value: 'adfsfdsa',
              title: '漯河市afdsf',
              type: 'ofStudent',
              children: [
                {
                  id: 'ewtrgewtrge',
                  name: '市辖区',
                  label: '市辖区',
                  value: 'ewtrgewtrge',
                  title: '市辖区',
                  type: 'ofStudent',
                  children: null
                }
              ]
            }
          ]
        },
        {
          id: 'sgfsgfdwet4ewt',
          name: '贵州省',
          label: '贵州省',
          value: 'sgfsgfdwet4ewt',
          title: '贵州省',
          type: 'ofStudent',
          children: [
            {
              id: 'wrytreytr',
              name: '贵阳市',
              label: '贵阳市',
              title: '贵阳市',
              type: 'ofStudent',
              value: 'wrytreytr'
            },
            {
              id: 'yuoiugjkmjhg',
              name: '安顺市',
              label: '安顺市',
              value: 'yuoiugjkmjhg',
              type: 'ofStudent',
              title: '安顺市',
              children: [
                {
                  id: 'hkdgjhnghcnj',
                  name: '关岭县',
                  label: '关岭县',
                  value: 'hkdgjhnghcnj',
                  type: 'ofStudent',
                  title: '关岭县',
                  children: null
                }
              ]
            }
          ]
        }
      ]
    })

    function editBtn() {
      state.isDetail = false
    }

    function cancelBtn() {
      state.isDetail = true
    }

    const handleChange = info => {
      const file = info.file
      const status = info.file.status
      if (status === 'done') {
        const res = file.response.data
        state.formData.avatar = res
      }
    }
    const myForm = ref(null)
    function submitBtn() {
      myForm.value
        .validate()
        .then(() => {
          const params = { ...state.formData }
          console.log(params, 'params')
          edit(params)
        })
        .catch(() => {
          message.warning('请按规则完善字段')
        })
    }

    async function getInfo() {
      try {
        let userId = LocalSave.getJson('cookieUser')
          ? LocalSave.getJson('cookieUser').id
          : undefined
        if (userId) {
          const { errMsg, data, success } = await getUsersbyIds(userId)
          if (success === true) {
            state.formData = data.pop()
          } else {
            message.warn(errMsg)
          }
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    async function edit(info) {
      try {
        const { errMsg, data, success } = await putAlreadyStu(info)
        if (success === true) {
          message.success('修改成功')
          router.push('/personal-page')
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    function getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    // //上传change
    // const handleChange = info => {
    //   if (info.file.status === 'uploading') {
    //     state.loading = true
    //     return
    //   }
    //   if (info.file.status === 'done') {
    //     getBase64(info.file.originFileObj, base64Url => {
    //       state.imageUrl = base64Url
    //       state.loading = false
    //     })
    //   }
    //   if (info.file.status === 'error') {
    //     state.loading = false
    //     message.error('上传失败，请重新上传！')
    //   }
    // }

    //上传之前校验
    const beforeUpload = file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        message.error('文件格式必须为jpg、png')
      }
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        message.error('文件大小不可超过5M')
      }
      return isJpgOrPng && isLt5M
    }

    onMounted(() => {
      getInfo()
    })

    return {
      ...toRefs(state),
      editBtn,
      cancelBtn,
      submitBtn,
      handleChange,
      beforeUpload,
      myForm
    }
  }
}
</script>

<style scoped lang="less">
.main-content-box {
  padding: 0 !important;
  padding-top: 20px !important;
  .pohto-box {
    margin: 0 auto;
    width: 84px;
    margin-left: calc(45%);
    height: 84px;
    border: 1px solid #cecece;
    border-radius: 50%;
    text-align: center;
    margin-bottom: 20px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    /deep/ .ant-image-img {
      width: 84px;
      height: 84px;
      border-radius: 50%;
      margin-top: -2px;
      margin-left: -2px;
    }
  }
  .item-box {
    .title {
      padding: 0 20px 10px;
      img {
        width: 25px;
      }
      span {
        font-weight: bold;
        position: relative;
        top: 2px;
      }
    }
    .item-content {
      border-top: 1px solid #cecece;
      padding: 20px;
    }
  }
  .btn-box {
    text-align: center;
    padding-bottom: 40px;
  }
}
/deep/ .ant-form-item-label > label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
</style>
