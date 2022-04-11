<template>
  <portalTemplate>
    <div class="nav">个人主页</div>
    <div class="main-content-box">
      <a-form ref="myForm" :rules="rules" :model="formData">
        <div class="pohto-box" v-if="isDetail">
          <img
            src="../../../assets/images/touxiang1.png"
            alt=""
            v-if="!imgUrl && sex === 0"
          />
          <img
            src="../../../assets/images/touxiang2.png"
            v-else-if="!imgUrl && sex === 1"
          />
          <a-image v-else :src="imgUrl" />
        </div>
        <a-form-item label="头像图片" name="img" v-else>
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
        </a-form-item>
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
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="身份证号" name="idNumber">
                  <a-input
                    allow-clear
                    v-model:value="formData.idNumber"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="邮箱" name="mailbox">
                  <a-input
                    allow-clear
                    v-model:value="formData.mailbox"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="性别" name="gender">
                  <a-input
                    allow-clear
                    v-model:value="formData.gender"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="生源地" name="ofStudent">
                  <a-input
                    allow-clear
                    v-model:value="formData.ofStudent"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="届" name="session">
                  <a-input
                    allow-clear
                    v-model:value="formData.session"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="电话" name="tel">
                  <a-input
                    allow-clear
                    v-model:value="formData.tel"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="QQ" name="QQ">
                  <a-input
                    allow-clear
                    v-model:value="formData.QQ"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="微信" name="wx">
                  <a-input
                    allow-clear
                    v-model:value="formData.wx"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="现居住地" name="address">
                  <a-input
                    allow-clear
                    v-model:value="formData.address"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="学生导师" name="studentTutor">
                  <a-input
                    allow-clear
                    v-model:value="formData.studentTutor"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="香港导师" name="hkTutor">
                  <a-input
                    allow-clear
                    v-model:value="formData.hkTutor"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
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
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="高中学校地址" name="highSchoolAddress">
                  <a-input
                    allow-clear
                    v-model:value="formData.highSchoolAddress"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="大学" name="university">
                  <a-input
                    allow-clear
                    v-model:value="formData.university"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="专业" name="major">
                  <a-input
                    allow-clear
                    v-model:value="formData.major"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="学年制" name="scholastic">
                  <a-input
                    allow-clear
                    v-model:value="formData.scholastic"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
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
                <a-form-item label="银行卡卡号" name="bankCard">
                  <a-input
                    allow-clear
                    v-model:value="formData.bankCard"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="银行名称" name="bank">
                  <a-input
                    allow-clear
                    v-model:value="formData.bank"
                    :placeholder="isDetail ? '-' : '请输入'"
                    :disabled="isDetail"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="开户行地址" name="acountAddress">
                  <a-input
                    allow-clear
                    v-model:value="formData.acountAddress"
                    :placeholder="isDetail ? '-' : '请输入'"
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
import { reactive, toRefs, ref } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { message } from 'ant-design-vue'
export default {
  components: {
    portalTemplate
  },
  setup() {
    const state = reactive({
      isDetail: true,
      fileList: [],
      imgUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      sex: 0,
      formData: {
        name: '',
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
      rules: {
        name: [
          {
            require: true,
            type: 'string',
            message: '名字不能为空'
          }
        ],
        idNumber: [
          {
            require: true,
            type: 'string',
            message: '身份证号不能为空'
          }
        ]
      }
    })

    function editBtn() {
      state.isDetail = false
    }

    function cancelBtn() {
      state.isDetail = true
    }

    const myForm = ref(null)
    function submitBtn() {
      myForm.value
        .validate()
        .then(() => {})
        .catch(() => {
          message.warning('请按规则完善字段')
        })
    }

    function getBase64(img, callback) {
      const reader = new FileReader()
      reader.addEventListener('load', () => callback(reader.result))
      reader.readAsDataURL(img)
    }

    //上传change
    const handleChange = info => {
      if (info.file.status === 'uploading') {
        state.loading = true
        return
      }
      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, base64Url => {
          state.imageUrl = base64Url
          state.loading = false
        })
      }
      if (info.file.status === 'error') {
        state.loading = false
        message.error('上传失败，请重新上传！')
      }
    }

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
    height: 84px;
    border: 1px solid #cecece;
    border-radius: 50%;
    padding: 2px;
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
