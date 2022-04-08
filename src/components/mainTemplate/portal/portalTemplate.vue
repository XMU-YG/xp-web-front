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
            <div class="login-wrap">
              <div class="header-imgage">
                <my-icon type="icon-touxiang" class="my-icon" />
                <span class="name">admin</span>
              </div>
              <div class="person-info">
                <a-dropdown>
                  <a href="javascript:;" class="current-user">
                    管理员
                    <DownOutlined style="color: #5b5e6e" />
                  </a>
                  <template #overlay>
                    <a-menu class="custom-menu">
                      <a-menu-item key="logout">
                        <a-button
                          type="link"
                          class="link-btn"
                          @click="returnSystem"
                          >后台管理</a-button
                        >
                      </a-menu-item>
                      <a-menu-item key="resetPwd">
                        <a-button type="link" class="link-btn" @click="resetPwd"
                          >修改密码</a-button
                        >
                      </a-menu-item>
                      <a-menu-item key="logout">
                        <a-button type="link" class="link-btn" @click="logOut">
                          登出
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
          <div class="menu">
            <a-menu
              v-model:selectedKeys="selectedKeys"
              mode="horizontal"
              @select="select"
            >
              <a-menu-item key="/"> 首页 </a-menu-item>
              <a-menu-item key="/tutor-service"> 导师服务 </a-menu-item>
              <a-menu-item key="/volunteer-service"> 志愿者服务 </a-menu-item>
              <a-menu-item key="/article"> 文章帖子 </a-menu-item>
              <a-menu-item key="/personal-page"> 个人主页 </a-menu-item>
            </a-menu>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content><slot></slot></a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getMenuList } from '@/services'
export default {
  setup() {
    const router = useRouter()
    const state = reactive({
      selectedKeys: ['/home'],
      menuList: []
    })

    onMounted(() => {
      getMenu()
    })

    async function getMenu() {
      try {
        state.menuList = await getMenuList()
      } catch (e) {
        throw Error(e)
      }
    }

    function select(e) {
      console.log(state.selectedKeys, 'selectedKeys')
      let url = `${e.key}`
      router.push(url)
    }
    function returnSystem() {
      router.push('/alreadyStu-manager')
    }

    function logOut() {
      router.push('/login')
    }

    return {
      ...toRefs(state),
      select,
      returnSystem,
      logOut
    }
  }
}
</script>

<style scoped lang="less">
.wrapper {
  height: 100%;
  margin: 0 auto;
  /deep/ header.ant-layout-header {
    height: 107px;
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
      padding: 0 26%;
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
        position: relative;
        top: -30px;
        .ant-menu {
          background: none !important;
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
