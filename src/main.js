import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Antd from './addComponent'
import './assets/css/main.less'
import saveToken from './utils/saveToken'

saveToken()
createApp(App).use(store).use(router).use(Antd).mount('#app')
