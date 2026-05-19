<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue';

//TypeScript 為保單摘要資料定義型別
const searchForm =reactive({
  policyNo: ''
}) 

//宣告基本變數
const isLoading = ref(false)
const result = ref<string[] | null>(null)
const errorMessage = ref('測試watch'); 


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
  errorMessage.value=''

  try {
    const inputNo = formatPolicyNo.value
    result.value = arrPolicy.includes(inputNo) ? [inputNo] : []
  } catch (error) {
    errorMessage.value='查詢失敗'
  }finally{
    isLoading.value = false
  }
}

</script>

<template>
  <div>
    <!-- v-model 綁定輸入框 -->
    保單號碼:<input v-model="searchForm.policyNo" placeholder="請輸入保單號碼" />
    <button @click="submit">查詢</button>

    <p v-if="isLoading">查詢中...</p>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <ul v-else-if="result && result.length">
      <li v-for="item in result":key="item">{{ item }}</li>
    </ul>
    <p v-else-if="result && result.length ===0">查無資料</p>
  </div>
</template>