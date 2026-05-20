<script setup lang="ts">
import { computed, reactive, watch, ref, h } from "vue";

const loginForm = reactive({
  user:'',
  password:'',
  policyNo:'',
})
//const formatUser = computed(()=>loginForm.user.trim().toUpperCase())
const messeage = ref('')
const isLoading = ref(false)
const result = ref<string[] | null>(null)
const errorMessage = ref(''); 
//宣告控制是否登入狀態變數
const isLogin = ref(false)
const arrPolicy = ['P2468','P1357']
const formatPolicyNo = computed(() => loginForm.policyNo.trim().toUpperCase())

//watch監控變化，當user重新輸入時清掉錯誤訊息
watch(
  () => loginForm.policyNo,
  () => {
    errorMessage.value = ''
    result.value = null
  }
)

async function login() {
    //if(formatUser.value === 'ADMIN' && loginForm.password === 'A12345'){
  if(loginForm.user === 'ADMIN' && loginForm.password === 'A12345'){
    messeage.value = '登入成功'
    isLogin.value = true
  }else{
    messeage.value = '登入失敗'
  }
}

async function submit() {
  isLoading.value = true;
  errorMessage.value = ''

  try {
    const inputNo = formatPolicyNo.value
    // 模擬非同步延
    await new Promise(resolve => setTimeout(resolve, 800))
    if (inputNo === 'P500') {
      throw new Error('該保單編號已失效或發生系統異常！(代碼：500)');
    }
    result.value = arrPolicy.includes(inputNo) ? [inputNo] : []
  } catch (error:any) {
    errorMessage.value = error.message ||'查詢失敗'
  } finally {
    isLoading.value = false
  }
}

const logout =() =>{
  loginForm.user = ''
  loginForm.password = ''
  isLogin.value = false
  messeage.value = ''
}

</script>

<template>
  <div>
    <div v-if="!isLogin">
      <h2>登入系統</h2>
      <div>
        <label>帳號</label>
        <div>
          <input type="text" v-model="loginForm.user"/>
        </div>
        <label>密碼</label>
        <div>
          <input type="password" v-model="loginForm.password"/>
        </div>
        <button @click="login">登入</button>
        <p v-if="messeage">{{ messeage }}</p>
      </div>
    </div>
    <div v-else>
      <h2>保單查詢</h2>
      <div>
        <label>保單號碼</label>
         <div class="search-container">
    <!-- v-bind 綁定 class 當有錯誤訊息時，輸入框加上 border-danger 變紅框 -->
    <!-- 保單號碼: -->
          <input v-model="loginForm.policyNo" placeholder="請輸入保單號碼" />
          <button @click="submit">{{ isLoading ? '處理中...' : '查詢' }}</button>
          <p v-if="isLoading">查詢中...</p>
    <!-- v-bind 綁定 class，動態呈現錯誤樣式 -->
          <p v-else-if="errorMessage" :class="'text-danger'">{{ errorMessage }}</p>
          <ul v-else-if="result && result.length">
          <li v-for="item in result" :key="item">{{ item }}</li>
          </ul>
           <p v-else-if="result && result.length === 0">查無資料</p>
        </div>
      </div>
      <button @click="logout">登出</button>
    </div>
  </div>
  
</template>

<style scoped>
/* v-bind 加上 CSS 樣式 */
.text-danger {
  color: #dc3545;
  font-weight: bold;
}

</style>