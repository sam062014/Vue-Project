<script setup lang="ts">
import { ref } from 'vue';
import { useTodoList } from '../composables/useTodoList';

interface TodoProps {
  id: number;
  text: string;
  isDone: boolean;
}

defineProps<{
  item: TodoProps
}>();

const isEditing = ref(false);
const emit = defineEmits(['cancel-todolist','update-isdone','update-text']);

</script>

<template>
  <li class="todo-item" :class="{ 'is-done': item.isDone }">
    <div class="item-left">
      <!-- 打勾輸入框，讀取父元件isDone狀態，勾選後回傳事件update-isdone、id-->
      <input :checked="item.isDone" @change="emit('update-isdone',item.id)" type="checkbox" class="todo-checkbox" />
      <!-- 編輯狀態為true就顯示編輯輸入框反之顯示原本待辦事項-->
      <input v-if="isEditing" v-model="item.text" type="text" />
      <span v-else>{{ item.text }}</span>
      <!-- 只有打勾時且不是編輯狀態才顯示 -->
      <span v-if="item.isDone && !isEditing" class="badge-done">已完成</span>
    </div>
    <!-- 編輯按鈕，只有不是編輯狀態且未打勾時顯示，點擊切換編輯狀態-->
    <button v-if="!isEditing&&!item.isDone"  @click="isEditing=true" class="btn-edit">編輯</button>
    <!-- 儲存按鈕，只有編輯狀態時顯示，點擊後切換編輯狀態為false，回傳事件update-text、id、text回父元件 -->
    <button v-else-if="isEditing" @click="isEditing=false,emit('update-text', item.id,item.text)" class="btn-save">儲存</button>
    <!-- 刪除按鈕，只有打勾時顯示，點擊後回傳事件cancel-todolist、id回父元件-->
    <button v-if="item.isDone" @click="emit('cancel-todolist', item.id)" class="btn-delete">刪除</button>
  </li>
</template>

<style scoped src="@/assets/css/TodoItem.css"></style>