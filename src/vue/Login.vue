<script setup lang="ts">
import { ref,watch } from "vue";

// 引入路徑
import { useAuthForm } from "../composables/useAuthForm";
import CommonBlock from "../components/CommonBlock.vue";
import QueryForm from "../components/QueryForm.vue";
import QueryResult from "../components/QueryResult.vue";

const { loginForm, messeage, isLogin, login, logout } = useAuthForm();

const isLoading = ref(false);
const policyNo = ref('')
const result = ref<string[] | null>(null);
const errorMessage = ref('');
const arrPolicy = ['P2468', 'P1357'];

watch(//監控policyNo更動時清空errorMessage&result
  () => policyNo.value,
  () => {
    errorMessage.value = ''
    result.value = null
  }
)
watch(
  () => isLogin.value,
  (newVal) => {
    if (!newVal) {
      result.value = null;
      errorMessage.value = '';
      policyNo.value = '';
    }
  }
);

async function handlePolicySearch(policyNo: string) {
  errorMessage.value = '';
  result.value = null;

  if (!policyNo) return;//檢核若輸入空白就return

  isLoading.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (policyNo === 'P500') {
      throw new Error('該保單編號已失效或發生系統異常！(代碼：500)');
    }
    result.value = arrPolicy.includes(policyNo) ? [policyNo] : [];
  } catch (error: any) {
    errorMessage.value = error.message || '查詢失敗';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <!-- 未登入 -->
    <div v-if="!isLogin">
      <CommonBlock>
        <template #title>
          <h2>登入系統</h2>
        </template>
        
        <div>
          <label>帳號</label>
          <input type="text" v-model="loginForm.user"/>
          <label>密碼</label>
          <input type="password" v-model="loginForm.password"/>
          <button @click="login">登入</button>
          <p v-if="messeage">{{ messeage }}</p>
        </div>
      </CommonBlock>
    </div>

    <!-- 已登入 -->
    <div v-else>
      <CommonBlock>
        <template #title>
          <h2>保單查詢系統</h2>
        </template>

        <QueryForm v-model="policyNo" @query-policy="handlePolicySearch" />
        <QueryResult 
          :isLoading="isLoading" 
          :errorMessage="errorMessage" 
          :result="result" 
        />
        <button @click="logout">登出</button>
      </CommonBlock>
      
      
    </div>
  </div>
</template>