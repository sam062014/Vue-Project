<script setup lang="ts">
import { ref,computed } from 'vue';

const emit = defineEmits(['submit']);
const formatPolicyNo = computed(() => policyNo.value.trim().toUpperCase())
const policyNo = defineModel<string>({ default: '' });
function sendToParent() {
  emit('submit', formatPolicyNo.value);
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