<template>
  <setion class="login-wrap">
    <!-- <div class="header-imgage">
      <span class="name">admin</span>
    </div> -->
    <div class="person-info">
      <a-dropdown>
        <my-icon type="icon-touxiang" class="my-icon" />
        <a href="javascript:;" class="current-user">
          管理员
          <DownOutlined style="color: #5b5e6e" />
        </a>
        <template #overlay>
          <a-menu class="custom-menu">
            <a-menu-item key="logout">
              <a-button type="link" class="link-btn" @click="returnPortal"
                >返回门户</a-button
              >
            </a-menu-item>
            <a-menu-item key="logout">
              <a-button type="link" class="link-btn" @click="logOut"
                >登出</a-button
              >
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-badge dot class="dot">
        <my-icon type="icon-xiaoxi" class="notifi-icon" />
      </a-badge>
    </div>
  </setion>
</template>

<script>
import { getLogoutService } from '@/services'
import { useRouter } from 'vue-router'

export default {
  name: 'LoginInfo',
  setup() {
    const router = useRouter()

    function logOut() {
      localStorage.clear()
      router.push('/login')
    }

    function returnPortal() {
      router.push('/home')
    }
    return {
      logOut,
      returnPortal
    }
  }
}
</script>

<style scoped lang="less">
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
</style>
