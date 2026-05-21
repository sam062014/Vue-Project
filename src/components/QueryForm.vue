<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['query-policy']);
const formatPolicyNo = computed(() => policyNo.value.trim().toUpperCase())
const policyNo = defineModel<string>({ default: '' });
function sendToParent() {
  emit('query-policy', formatPolicyNo.value);
}
</script>

<template>
  <div>
    <label>保單號碼</label>
    <div class="search-container">
      <input v-model="policyNo" placeholder="請輸入保單號碼" />
      <button @click="sendToParent">查詢</button>
    </div>
  </div>
</template>