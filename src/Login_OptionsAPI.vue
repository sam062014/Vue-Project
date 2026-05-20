<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PolicySystemOptions",
  
  // 1. 所有狀態（原本的 ref, reactive）都集中在 data 函式中回傳
  data() {
    return {
      loginForm: {
        user: '',
        password: '',
        policyNo: '',
      },
      messeage: '',
      isLoading: false,
      result: null as string[] | null,
      errorMessage: '',
      isLogin: false,
      arrPolicy: ['P2468', 'P1357']
    };
  },

  // 2. 計算屬性（原本的 computed）
  computed: {
    formatPolicyNo(): string {
      return this.loginForm.policyNo.trim().toUpperCase();
    }
  },

  // 3. 監聽器（原本的 watch）
  watch: {
    // 監聽物件內的特定屬性，寫法為字串路徑
    'loginForm.policyNo'() {
      this.errorMessage = '';
      this.result = null;
    }
  },

  // 4. 所有函式（原本的 async function / const func）都集中在 methods
  methods: {
    async login() {
      if (this.loginForm.user === 'ADMIN' && this.loginForm.password === 'A12345') {
        this.messeage = '登入成功';
        this.isLogin = true;
      } else {
        this.messeage = '登入失敗';
      }
    },

    async submit() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const inputNo = this.formatPolicyNo; // 讀取計算屬性
        // 模擬非同步延遲
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (inputNo === 'P500') {
          throw new Error('該保單編號已失效或發生系統異常！(代碼：500)');
        }
        this.result = this.arrPolicy.includes(inputNo) ? [inputNo] : [];
      } catch (error: any) {
        this.errorMessage = error.message || '查詢失敗';
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.loginForm.user = '';
      this.loginForm.password = '';
      this.isLogin = false;
      this.messeage = '';
    }
  }
});
</script>

<template>
  <div>
    <div v-if="!isLogin">
      <h2>登入系統（Options API）</h2>
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
          <input v-model="loginForm.policyNo" placeholder="請輸入保單號碼" />
          <button @click="submit">{{ isLoading ? '處理中...' : '查詢' }}</button>
          <p v-if="isLoading">查詢中...</p>
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
.text-danger {
  color: #dc3545;
  font-weight: bold;
}
</style>