import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import LoginOptions from './Login_OptionsAPI.vue' // 1. 引入Login_Options檔案
import LoginComposable from './Login_Composable.vue' // 引入Login_Composable檔案
import router from './router'

// App.vue
// const app = createApp(App)
const app = createApp(LoginComposable)
// const app = createApp(LoginOptions)
app.use(createPinia())
app.use(router) // 如果 Login 裡面有用路由才需要打開，不然這樣就很安全

// ------------------------------

app.mount('#app')