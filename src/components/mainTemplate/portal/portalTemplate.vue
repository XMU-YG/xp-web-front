<template>
  <div class="wrapper">
    <a-layout>
      <a-layout-header>
        <div class="title-wrapper">
          <div class="title-box">
            <div class="title">
              <a-image
                src="http://xpef.oss-cn-chengdu.aliyuncs.com/images/xplogo.png"
                style="width: 35px"
              />
              <a-image
                src="http://xpef.oss-cn-chengdu.aliyuncs.com/images/xpef2.png"
                style="height: 40px"
              />
            </div>
            <div class="menu">
              <a-menu
                v-model:selectedKeys="selectedKeys"
                mode="horizontal"
                @select="select"
              >
                <a-menu-item key="home">
                  <router-link to="/">首页</router-link>
                </a-menu-item>
                <a-menu-item
                  v-if="menuList.indexOf('导师助手') > -1"
                  key="tutor-service"
                >
                  <router-link to="/tutor-service">导师服务</router-link>
                </a-menu-item>
                <a-menu-item
                  v-if="menuList.indexOf('志愿者服务') > -1"
                  key="volunteer-service"
                >
                  <router-link to="/volunteer-service">志愿者服务</router-link>
                </a-menu-item>
                <a-menu-item key="article">
                  <router-link to="/article">文章帖子</router-link>
                </a-menu-item>
                <a-menu-item key="personalPage">
                  <router-link to="/personal-page">个人主页</router-link>
                </a-menu-item>
              </a-menu>
            </div>
            <div class="login-wrap">
              <div class="header-imgage">
                <my-icon type="icon-touxiang" class="my-icon" />
              </div>
              <div class="person-info">
                <a-dropdown>
                  <a href="javascript:;" class="current-user">
                    {{ cookieUser ? cookieUser.name : '' }}
                    <DownOutlined style="color: #5b5e6e" />
                  </a>
                  <template #overlay>
                    <a-menu class="custom-menu">
                      <a-menu-item
                        v-if="menuList.indexOf('后台管理') > -1"
                        key="logout"
                      >
                        <a-button
                          type="link"
                          class="link-btn"
                          @click="returnSystem"
                          ><template #icon> <setting-outlined /> </template
                          >后台管理</a-button
                        >
                      </a-menu-item>
                      <a-menu-item key="resetPwd">
                        <a-button type="link" class="link-btn" @click="resetPwd"
                          ><edit-outlined />修改密码</a-button
                        >
                      </a-menu-item>
                      <a-menu-item key="logout">
                        <a-button type="link" class="link-btn" @click="logOut">
                          <logout-outlined />登出
                        </a-button>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
                <a-badge dot class="dot">
                  <my-icon type="icon-xiaoxi" class="notifi-icon" />
                </a-badge>
              </div>
            </div>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content><slot></slot></a-layout-content>
    </a-layout>
    <a-modal
      width="600px"
      v-model:visible="visible"
      title="修改密码"
      :footer="null"
      :destroyOnClose="true"
    >
      <ResetPwd />
    </a-modal>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { checkLogin, getMenuList } from '@/services'
import ResetPwd from '@/components/mainTemplate/portal/ResetPwd'
import LocalSave from '@/utils/localSave'
import { useStore } from 'vuex'
import { userLogout } from '@/hooks'

export default {
  components: {
    ResetPwd
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      // selectedKeys: ['home'],
      menuList: [],
      status: true, //是否已登陆
      visible: false,
      cookieUser: {}
    })
    const selectedKeys = computed(() => {
      return store.state.currentMenu.currentMenu
    })
    onMounted(() => {
      let id = LocalSave.getJson('cookieUser').id
      if (id === null) {
        router.push('/login')
      } else {
        checkLoginStatus(id)
      }
    })

    async function checkLoginStatus(userId) {
      try {
        const { errMsg, data, success } = await checkLogin(userId)
        if (success === true) {
          //已登录
          state.cookieUser = LocalSave.getJson('cookieUser')
          getMenu()
        } else {
          router.push('/login')
        }
      } catch (error) {
        router.push('/login')
      }
    }

    async function getMenu() {
      try {
        let id = LocalSave.getJson('cookieUser')
          ? LocalSave.getJson('cookieUser').id
          : undefined
        if (id) {
          state.menuList = await getMenuList({
            userId: id
          })
        }
      } catch (e) {
        throw Error(e)
      }
    }

    function select(e) {
      // let url = `${e.key}`
      console.log('xxxxxxxx')
      store.commit('currentMenu/changeCurrentMenu', e.key)
      // router.push(url)
    }
    function returnSystem() {
      router.push('/alreadyStu-manager')
    }

    function logOut() {
      let id = LocalSave.getJson('cookieUser').id
      userLogout(id)
      LocalSave.removeStorage()
      router.push('/login')
    }

    function resetPwd() {
      state.visible = true
    }

    return {
      ...toRefs(state),
      select,
      selectedKeys,
      returnSystem,
      logOut,
      resetPwd
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  height: 100%;
  margin: 0 auto;
  /deep/ header.ant-layout-header {
    background: linear-gradient(180deg, #3d82d7, #5b8bf7);
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected {
      color: #fff;
    }
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
    .ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
    .ant-menu-horizontal:not(.ant-menu-dark)
      > .ant-menu-submenu-selected::after {
      border-bottom: 2px solid #fff;
    }
    ul.ant-menu-overflow.ant-menu.ant-menu-root.ant-menu-horizontal.ant-menu-light {
    }
    .title-wrapper {
      margin: 0 auto;
      width: 1200px;
      .title-box {
        display: flex;
        justify-content: space-between;
        color: #fff;
        .title {
          margin-bottom: 10px;
        }
        .login-wrap {
          display: flex;
          align-items: center;
          .header-imgage {
            color: #fff;
            height: 30px;
            line-height: 30px;
            padding-right: 10px;
            border-right: 1px solid #808287;
            .my-icon {
              font-size: 20px;
              margin-right: 8px;
              position: relative;
              top: 3px;
            }
            .name {
              font-size: 14px;
            }
          }
          .person-info {
            padding-left: 10px;
            .current-user {
              color: #fff;
              font-size: 14px;
            }
            /deep/ .dot {
              position: relative;
              top: 2px;
            }
            .notifi-icon {
              color: #fff;
              margin-left: 8px;
              font-size: 20px;
            }
          }
        }
      }
      .menu {
        min-width: calc(40%) !important;
        .ant-menu-horizontal {
          border: none !important;
        }
        .ant-menu {
          background: none !important;
          color: #fff !important;
        }
        .ant-menu-horizontal > .ant-menu-item a {
          color: #fff !important;
        }
      }
    }
  }
  /deep/ main.ant-layout-content {
    min-height: 100%;
    width: 1200px;
    margin: 0 auto;
  }
}
</style>
