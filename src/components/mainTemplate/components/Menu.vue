<template>
  <section class="menu-wrap">
    <a-menu
      mode="inline"
      @select="menuSelect"
      v-model:selectedKeys="currentMenu"
      v-model:openKeys="openMenu"
    >
      <template v-for="item in menuList" :key="item.path">
        <a-sub-menu v-if="item.children" :key="item.path">
          <template #icon>
            <my-icon :type="item.icon" class="menu-icon" />
          </template>
          <template #title>
            {{ item.title }}
          </template>
          <template v-for="child in item.children" :key="child.path">
            <a-sub-menu
              v-if="child.children && child.children.length"
              :key="child.path"
              :title="child.title"
            >
              <template #icon>
                <my-icon type="icon-fangkuai" class="menu-icon" />
              </template>
              <a-menu-item v-for="three in child.children" :key="three.name">
                <router-link
                  :to="three.name"
                  :class="{
                    'router-link-active': currentMenu.some(
                      id => id === three.name
                    )
                  }"
                  >{{ three.title }}</router-link
                >
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item v-else :key="child.name">
              <router-link
                :to="child.name"
                :class="{
                  'router-link-active': currentMenu.some(
                    id => id === child.name
                  )
                }"
                >{{ child.title }}</router-link
              >
            </a-menu-item>
          </template>
        </a-sub-menu>
        <a-menu-item :key="item.name" v-else>
          <template #icon>
            <my-icon :type="item.icon" class="menu-icon" />
          </template>
          <router-link
            :to="item.name"
            :class="{
              'router-link-active': currentMenu.some(id => id === child.name)
            }"
            >{{ item.title }}</router-link
          >
        </a-menu-item>
      </template>
    </a-menu>
  </section>
</template>

<script>
import { reactive, toRefs, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { routerList } from '@/router/menu'
export default {
  name: 'Menu',
  props: {
    isCollapsed: Boolean
  },
  setup() {
    const route = useRoute()
    const state = reactive({
      currentMenu: [],
      openMenu: []
    })

    //菜单列表数据
    const menuList = computed(() => {
      if (routerList && routerList.length) {
        return routerList
      } else {
        return []
      }
    })
    const floatMenu = computed(() => {
      if (menuList.value && menuList.value.length) {
        return floatData(menuList.value)
      }
      return []
    })
    //页面加载完成后，判断当前路由，并把他赋值给菜单
    onMounted(() => {
      console.log(menuList.value)
      const name = route.name
      state.openMenu = findOpenKey(name)
      state.currentMenu = [name]
    })
    watch(
      () => state.currentMenu,
      val => {},
      { deep: true }
    )

    function findOpenKey(name) {
      let result = []

      let one = floatMenu.value.find(
        item =>
          item.children && item.children.some(child => child.name === name)
      )

      // result.push(one.path)
      // let two = floatMenu.value.find(
      //   item =>
      //     item.children && item.children.some(child => child.path === one.path)
      // )
      // if (two) {
      //   result.push(two.path)
      // }

      return result
    }

    function floatData(data, parentId) {
      let result = []
      data.forEach(item => {
        if (parentId) {
          item.parentId = parentId
        }
        result.push(item)
        if (item.children && item.children.length) {
          result = result.concat(floatData(item.children, item.id))
        }
      })
      return result
    }
    function menuSelect(val) {}
    return { ...toRefs(state), menuList, menuSelect }
  }
}
</script>

<style scoped lang="less">
.menu-wrap {
  padding-top: 20px;
  .collapsed {
    padding-left: 22px !important;
  }
}
.sub-text {
  margin-left: 0 !important;
}
/deep/ .router-link-active {
  &::before {
    background: #000;
  }
}
</style>
