import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'dwxSsrProject',  // 自定义字符 - 对应本地储存的键
    })(store)
  })
}