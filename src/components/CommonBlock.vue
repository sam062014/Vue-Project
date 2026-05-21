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
  /* 限制最大寬度左右區塊自動推擠到置中 */
  max-width: 500px;   
  margin: 0 auto 20px auto; /* 上下維持留白，左右 auto 自動置中 */
}
.block-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}
</style>