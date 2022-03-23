<!-- 面包屑 -->
<template>
  <section class="breadcrumb-wrap">
    <a-breadcrumb>
      <a-breadcrumb-item>
        <a href="/">系统管理</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="(item, index) in navList" :key="item.id">
        <span :class="{ last: index === navList.length - 1 }">
          {{ item.title }}
        </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </section>
</template>

<script>
import { reactive, toRefs, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      navList: []
    })
    //页面加载完后获取路由信息，生成面包屑列表
    onMounted(() => {
      state.navList = route.meta.path.map(item => {
        return {
          id: String(Math.random()),
          title: item
        }
      })
    })
    //监控路由信息有变化后，改变面包屑列表
    watch(route, () => {
      state.navList = route.meta.path.map(item => {
        return {
          id: String(Math.random()),
          title: item
        }
      })
    })
    return { ...toRefs(state) }
  }
}
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.breadcrumb-wrap {
  height: 30px;
  background-color: #000;
  display: flex;
  align-items: center;
  /deep/ .ant-breadcrumb-link {
    color: #5e606a;
    a {
      color: #5e606a;
    }
    .last {
      color: #c3c3c6;
    }
  }
  /deep/ .ant-breadcrumb-separator {
    color: #5e606a;
  }
}
</style>
