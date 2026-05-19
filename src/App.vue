<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue';

//TypeScript 為保單摘要資料定義型別
const searchForm = reactive({
  policyNo: ''
}) 

//宣告基本變數
const isLoading = ref(false)
const result = ref<string[] | null>(null)
const errorMessage = ref(''); 


//computed 產生格式化後的保單號（自動去空格轉大寫）
const formatPolicyNo = computed(() => searchForm.policyNo.trim().toUpperCase())

//watch監控變化，當user重新輸入時清掉錯誤訊息
watch(
  () => searchForm.policyNo,
  () => {
    errorMessage.value = ''
    result.value = null
  }
)

const arrPolicy = ['P2468','P1357']

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
</script>

<template>
  <div class="search-container">
    <!-- v-bind 綁定 class 當有錯誤訊息時，輸入框加上 border-danger 變紅框 -->
    保單號碼:
    <input v-model="searchForm.policyNo" placeholder="請輸入保單號碼" />
    
    <button @click="submit">{{ isLoading ? '處理中...' : '查詢' }}</button>

    <p v-if="isLoading">查詢中...</p>
    
    <!-- v-bind 綁定 class，動態呈現錯誤樣式 -->
    <p v-else-if="errorMessage" :class="'text-danger'">{{ errorMessage }}</p>
    
    <ul v-else-if="result && result.length">
      <li v-for="item in result" :key="item">{{ item }}</li>
    </ul>
    <p v-else-if="result && result.length === 0">查無資料</p>
  </div>
</template>

<style scoped>
/* v-bind 加上 CSS 樣式 */
.text-danger {
  color: #dc3545;
  font-weight: bold;
}

</style>