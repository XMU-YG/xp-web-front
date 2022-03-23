import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export function useRouteParams(tag = 'id') {
  const state = reactive({
    activeKey: 'list'
  })
  const route = useRoute()
  const router = useRouter()
  const originPath = route.name

  function openRouteParam(id, param) {
    const ids = route.params[tag]
    let types = route.query.type
    console.log(ids, 'ids')
    console.log(types, 'types')
    if (types) {
      types = JSON.parse(window.decodeURI(types))
    }
    if (ids && ids.length) {
      if (ids.some(item => item === id)) {
        types = types.map(item => {
          if (item[tag] === id) {
            return {
              ...param,
              label:
                param.label.length > 10
                  ? param.label.slice(0, 10) + '...'
                  : param.label,
              [tag]: id
            }
          }
          return { ...item }
        })
        let paths = router.resolve({
          name: originPath,
          params: {
            id: ids
          },
          query: {
            type: window.encodeURI(JSON.stringify(types)),
            current: id
          }
        })
        router.replace(paths.fullPath)
        return
      }
      ids.push(id)
      types.push({
        ...param,
        label:
          param.label.length > 10
            ? param.label.slice(0, 10) + '...'
            : param.label,
        [tag]: id
      })

      let newPath = router.resolve({
        name: originPath,
        params: {
          id: ids
        },
        query: {
          type: window.encodeURI(JSON.stringify(types)),
          current: id
        }
      })
      router.replace(newPath.fullPath)
    } else {
      let paths = router.resolve({
        name: originPath,
        params: {
          id: [id]
        },
        query: {
          type: window.encodeURI(
            JSON.stringify([
              {
                ...param,
                label:
                  param.label.length > 10
                    ? param.label.slice(0, 10) + '...'
                    : param.label,
                [tag]: id
              }
            ])
          ),
          current: id
        }
      })
      router.replace(paths.fullPath)
    }
  }

  function getRouteParam(callBack) {
    let ids = route.params[tag]
    let types = route.query.type
    let current = route.query.current
    if (ids && ids.length) {
      ids = ids.filter(item => item)
      types = JSON.parse(window.decodeURI(types))
      state.activeKey = current ? current : 'list'
      callBack({ id: ids, type: types, current })
    } else {
      state.activeKey = 'list'
      callBack({ id: [], type: [], current: null })
    }
  }

  function deleteRouteParam(id, callBack) {
    let ids = route.params[tag]
    let types = route.query.type
    if (types) {
      types = JSON.parse(window.decodeURI(types))
    }
    if (!id || !ids || !ids.length || !types || !types.length) {
      return
    }
    ids = ids.filter(item => item !== id)
    types = types.filter(item => item[tag] !== id)
    if (!ids.length) {
      router.replace({
        name: originPath
      })
    } else {
      let paths = router.resolve({
        name: originPath,
        params: {
          id: ids
        },
        query: {
          type: window.encodeURI(JSON.stringify(types)),
          current: ids[ids.length - 1]
        }
      })
      router.replace(paths.fullPath)
    }
    callBack && callBack({ id: ids, type: types })
  }

  function changeCurrentId(id) {
    let ids = route.params.id
    let types = route.query.type
    if (ids) {
      let paths = router.resolve({
        name: route.name,
        params: {
          id: ids
        },
        query: {
          type: types,
          current: id
        }
      })
      router.replace(paths.fullPath)
    }
  }

  return {
    ...toRefs(state),
    openRouteParam,
    getRouteParam,
    deleteRouteParam,
    changeCurrentId
  }
}
