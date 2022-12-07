import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
import "echarts"
import Echarts from 'vue-echarts'
const app = createApp(App)
// 全局注册组件（也可以使用局部注册）
app.component('v-chart',Echarts)
app.use(router)
app.mount('#app')
