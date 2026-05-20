<template>
  <div class="block-container">
    <div class="block-header">
      <slot name="title"></slot>
    </div>
    <div class="block-content">
      <slot></slot>
    </div>
  </div>
</template>


<style scoped>
.block-container {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.block-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
</style>