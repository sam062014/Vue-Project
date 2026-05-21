import { createRouter, createWebHistory } from 'vue-router'
// 引入主元件
import LoginView from '../vue/Login.vue'
import LoginBase from '../vue/LoginBase.vue'  
import LoginOptions from '../vue/LoginOptions.vue'


const router = createRouter({
  // 這裡的 import.meta.env.BASE_URL 保持不動，它是 Vite 的環境變數設定
  history: createWebHistory(import.meta.env.BASE_URL),
  
  //在 routes 裡面加上路徑配對
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView // 預設首頁直接載入這一頁
    },
    {
      path: '/base',        // 網址 localhost:5173/base 切換到這頁
      name: 'loginBase',    // 路由名稱
      component: LoginBase  // 對應 import 進來的元件
    },
    {
      path: '/options',        // 網址 localhost:5173/base 切換到這頁
      name: 'loginOptions',    // 路由名稱
      component: LoginOptions  // 對應 import 進來的元件
    }
  ],
})

export default router