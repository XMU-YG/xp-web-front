<template>
  <a-layout>
    <a-layout-header>
      <Header />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        width="200"
        collapsible
        v-model:collapsed="isCollapsed"
        :trigger="createIcon()"
      >
        <Menu :isCollapsed="isCollapsed" />
      </a-layout-sider>
      <a-layout-content class="layout-content">
        <!--        <router-view class="main-content-wrap" />-->
        <slot></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { reactive, ref, createVNode } from 'vue'
import Menu from './components/Menu'
import Header from './components/Header'
import CommonNav from '@/components/commonNav/CommonNav'
export default {
  name: 'MainTemplate',
  components: {
    Header,
    Menu
  },
  setup() {
    const isCollapsed = ref(false)

    function createIcon() {
      return createVNode(
        <a-button type="link">
          {isCollapsed.value ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </a-button>
      )
    }
    return { isCollapsed, createIcon }
  }
}
</script>

<style scoped lang="less"></style>
