<template>
  <a-tree-select
    :treeDefaultExpandAll="false"
    v-model:value="value"
    show-search
    :dropdown-style="{
      maxHeight: '400px',
      overflow: 'auto'
    }"
    :placeholder="disabled ? '-' : '请选择'"
    :disabled="disabled"
    allow-clear
    :tree-data="tree"
    labelInValue
    @select="selectTree"
    :getPopupContainer="
      triggerNode => {
        return triggerNode.parentNode
      }
    "
  />
</template>

<script>
import { reactive, toRefs, nextTick, computed } from 'vue'
export default {
  props: {
    treeValue: Object,
    disabled: Boolean
  },
  setup(props, { emit }) {
    const state = reactive({
      defaultTitle: '',
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
    //表单值计算属性
    const value = computed({
      get: () => {
        return props.treeValue
      },
      set: val => {
        emit('update:treeValue', val)
      }
    })

    /**
     * @description 设置当前选中对象
     */
    let returnStatus = false
    function setTitle(title) {
      returnStatus = false
      getSelectedItem(title, state.tree)
      nextTick(() => {
        value.value = {
          label: state.defaultTitle,
          value: title
        }
      })
    }
    /**
     * @description 当前选中对象的title(拼接所有父级title)
     */
    function getSelectedItem(value, data, title) {
      for (let item of data) {
        if (returnStatus) return
        //在根节点找到对应选项
        if (!title && item.id == value) {
          returnStatus = true
          state.defaultTitle = item.title
        }
        //根节点未找到继续递归查找
        else if (!title && item.children) {
          state.defaultTitle = item.title
          getSelectedItem(value, item.children, state.defaultTitle)
        }

        //在子节点找到对应选项
        if (title && item.id == value) {
          returnStatus = true
          state.defaultTitle = title + item.title
        }
        //当前子节点未找到继续递归向下查找
        else if (title && item.children && item.children.length) {
          state.defaultTitle = title + item.title
          getSelectedItem(value, item.children, state.defaultTitle)
        }
      }
    }

    /**
     * @description 选择节点触发
     */
    function selectTree(nodeValue) {
      setTitle(nodeValue.value)
    }

    return {
      ...toRefs(state),
      value,
      selectTree
    }
  }
}
</script>

<style scoped lang="less"></style>
