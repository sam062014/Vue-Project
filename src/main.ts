import { createApp } from 'vue'
// 1. 記得引入 Notify 外掛
import { Quasar, Notify } from 'quasar' 
import App from './App.vue'
// 2. 把原本專案的 router 引入回來
import router from './router' 

// 引入 Quasar 核心樣式與圖標
import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

// 3. 讓 app 使用路由，消除 RouterView 警告
app.use(router)

app.use(Quasar, {
  // 4. 在這裡把 Notify 註冊進去，彈出視窗才會正常運作
  plugins: {
    Notify
  }, 
})

app.mount('#app')