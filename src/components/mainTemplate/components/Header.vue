<template>
  <header class="header-wrap">
    <h2 class="title">小平基金会数据管理后台</h2>
    <LoginInfo />
  </header>
</template>

<script>
import { reactive } from 'vue'
import LoginInfo from './LoginInfo'

export default {
  name: 'Header',
  components: {
    LoginInfo
  },
  setup() {}
}
</script>

<style scoped lang="less">
.header-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.title {
  color: #fff;
  margin: 0;
}
</style>
