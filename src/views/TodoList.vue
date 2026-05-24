<script setup lang="ts">
import { useTodoList } from '../composables/useTodoList';
const { todolistForm, todoList, insertTodoList, cancelTodoList,updateisDone,updateText } = useTodoList();
import CommonBlock from "../components/CommonBlock.vue";
import TodoItem from '@/components/TodoItem.vue';
</script>

<template>
  <div class="todo-container">
    <CommonBlock class="todo-card">
        <template #title>
            <h2 class="todo-title">我的待辦事項</h2>
        </template>
        <!-- 輸入區域 -->
        <div class="input-group">
            <input type="text" placeholder="請輸入待辦事項..." v-model="todolistForm.text" class="todo-input"/>
            <button @click="insertTodoList" class="btn-add">新增</button>
        </div>
        <!-- 列表呼叫子元件 -->
        <ul class="todo-list">
            <TodoItem  v-for="item in todoList" 
            :key="item.id" 
            :item="item"
            @update-isdone="updateisDone"
            @update-text="updateText"
            @cancel-todolist="cancelTodoList"/>
        </ul>
    </CommonBlock>
  </div>
</template>

<style scoped src="@/assets/css/TodoList.css"></style>