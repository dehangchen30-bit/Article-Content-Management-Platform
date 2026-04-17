// import { createApp } from 'vue'
// import pinia from '@/stores'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import App from './App.vue'
// import router from './router'

// const app = createApp(App)
// app.use(pinia)
// app.use(router)
// app.use(ElementPlus)

// app.mount('#app')
import { createApp } from 'vue'
import { createPinia } from 'pinia' // 先导入 pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router' // 后导入 router
import './styles/variables.scss' // 引入全局变量
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) 
// 顺序：先挂载 Pinia → 再挂载 Router → 最后 ElementPlus
app.use(pinia) 
app.use(router)
app.use(ElementPlus)

app.mount('#app')