const currentMenu = {
  namespaced: true,
  state: () => ({
    currentMenu: ['home']
  }),
  mutations: {
    changeCurrentMenu(state, payload) {
      console.log(payload, 'payload')
      state.currentMenu = [payload]
      console.log(state.currentMenu, 'state.currentMenu')
    }
  }
}
export default currentMenu
