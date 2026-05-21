<script setup lang="ts">
defineProps<{
  isLoading: boolean;
  errorMessage: string;
  result: string[] | null;
}>();
</script>

<template>
  <div class="result-zone">
    <p v-if="isLoading">查詢中...</p>
    <p v-else-if="errorMessage" :class="'text-danger'">{{ errorMessage }}</p>
    <ul v-else-if="result && result.length">
      <li v-for="item in result" :key="item">{{ item }}</li>
    </ul>
    <p v-else-if="result && result.length === 0">查無資料</p>
  </div>
</template>

<style scoped>
.text-danger {
  color: #dc3545;
  font-weight: bold;
}
</style>