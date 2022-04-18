<template>
  <portalTemplate>
    <div class="nav">文章帖子 / 我要发布</div>
    <div class="main-content-box">
      <a-input
        v-model:value="formData.title"
        placeholder="请输入文章标题"
        class="title"
      />
      <a-textarea
        class="content"
        v-model:value="formData.content"
        placeholder="请输入正文"
        :auto-size="{ minRows: 20, maxRows: 30 }"
      />
      <div class="img">
        <p>图片上传</p>
        <div class="clearfix">
          <a-upload
            action="/api/file/upload?path=dbfile/temp"
            list-type="picture-card"
            @preview="handlePreview"
            @change="handleChange"
            :remove="handleRemove"
          >
            <div v-if="fileList.length < 4">
              <plus-outlined />
              <div class="ant-upload-text">上传</div>
            </div>
          </a-upload>
          <a-modal
            :visible="previewVisible"
            :footer="null"
            @cancel="handleCancel"
          >
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </div>
      <div class="item">
        <span class="label">文章标签</span>
        <a-select
          ref="select"
          v-model:value="formData.mark"
          style="width: calc(20%)"
        >
          <a-select-option value="成绩报告">成绩报告</a-select-option>
          <a-select-option value="感谢信">感谢信</a-select-option>
          <a-select-option value="学习分享">学习分享</a-select-option>
        </a-select>
      </div>
      <div class="item">
        <span class="label">谁可以看</span>
        <a-select
          ref="select"
          v-model:value="formData.privilege"
          style="width: calc(20%)"
        >
          <a-select-option value="仅导师可见">仅导师可见</a-select-option>
          <a-select-option value="所有人可见">所有人可见</a-select-option>
        </a-select>
      </div>
      <div class="btn">
        <a-button @click="publish" type="primary">发布</a-button>
      </div>
    </div>
  </portalTemplate>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import portalTemplate from '@/components/mainTemplate/portal/portalTemplate'
import { useRouter } from 'vue-router'
import { PlusOutlined } from '@ant-design/icons-vue'
import LocalSave from '@/utils/localSave'
import { message } from 'ant-design-vue'
import { createArticle } from '@/services'
export default {
  components: {
    portalTemplate,
    PlusOutlined
  },
  setup() {
    const state = reactive({
      images: [],
      formData: {
        userId: LocalSave.getJson('cookieUser').id,
        title: '',
        content: '',
        writer: LocalSave.getJson('cookieUser').name
      }
    })

    const previewVisible = ref(false)
    const previewImage = ref('')
    const fileList = ref([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ])

    const handleCancel = () => {
      previewVisible.value = false
    }

    const handleRemove = file => {
      const res = file.response.data
      console.log(res)
      state.images.map((val, i) => {
        if (val === res) {
          state.images.splice(i, 1)
        }
      })
    }

    const handlePreview = async file => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => resolve(reader.result)

        reader.onerror = error => reject(error)
      })
    }

    // const handleChange = ({ fileList: newFileList }) => {
    //   fileList.value = newFileList
    //   console.log(fileList, 'file')
    // }
    const handleChange = info => {
      const file = info.file
      const status = info.file.status
      if (status === 'done') {
        const res = file.response.data
        state.images.push(res)
      }
    }
    async function create(article) {
      try {
        const { errMsg, data, success } = await createArticle(article)
        if (success === true) {
          message.success('发布成功')
          router.push('/article')
        } else {
          message.warn(errMsg)
        }
      } catch (error) {
        throw new Error(error)
      }
    }

    const router = useRouter()

    function publish() {
      state.formData.annexs = JSON.stringify(state.images)
      console.log(state.formData)
      create(state.formData)
    }

    return {
      ...toRefs(state),
      publish,
      previewVisible,
      previewImage,
      fileList,
      handleCancel,
      handlePreview,
      handleChange,
      handleRemove
    }
  }
}
</script>

<style scoped lang="less">
.main-content-box {
  min-height: calc(100% - 70px) !important;
  width: calc(70%) !important;
  margin-left: calc(15%) !important;
  .title.ant-input,
  .title.ant-input:hover,
  .title.ant-input:focus {
    color: #303133;
    border-bottom: 1px solid #cecece;
    border-left: none !important;
    border-top: none !important;
    border-right: none !important;
    font-size: 24px;
    font-weight: bolder;
    box-shadow: none;
  }
  .content {
    margin: 20px 0;
  }
  .img {
    margin: 10px;
    p {
      color: #606266;
      border-bottom: 20px solid #fff;
    }
  }
  .item {
    margin-bottom: 20px;
    .label {
      margin-right: 10px;
    }
  }
  .btn {
    margin-bottom: 50px;
    margin-left: calc(45%) !important;
  }
}
</style>
