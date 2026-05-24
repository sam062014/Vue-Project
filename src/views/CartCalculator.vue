<script setup lang="ts">
import { useCart } from '../composables/useCart';
import CommonBlock from "../components/CommonBlock.vue";

const { cartForm, totalPrice, increase, decrease } = useCart();
</script>

<template>
  <div class="page-center">
    
    <CommonBlock class="fixed-card">
      
      <template #title>
        <h2>購物車</h2>
      </template>
      
      <div class="content-center">
        <div>
          <img src="../assets/book.png" alt="書本圖片" class="book-img"/>
        </div>
        
        <p>書本單價:${{ cartForm.price }}元</p>
        <div>
          <label>數量:</label>
          <button @click="increase">+</button>
          <span>{{ cartForm.quantity }}</span>
          <button @click="decrease">-</button>
        </div>
        <div>
          <input type="checkbox" v-model="cartForm.hasDiscount">
          <label>是否套用折扣</label>
        </div>
      </div>

      <hr />

      <div class="content-right">
        <label>總金額:</label>
        <span>{{ totalPrice }}</span>
        <p v-if="cartForm.errorMessages" class="text-danger">{{ cartForm.errorMessages }}</p>
      </div>
       
    </CommonBlock>
  </div>
</template>

<style scoped>
/* 讓卡片在網頁正中央 */
.page-center {
  display: flex;
  justify-content: center;
}

/* 框框大小固定 */
.fixed-card {
  width: 320px;
  box-sizing: border-box;
}

/* 文字置中 */
.content-center {
  text-align: center;
}

/* 總金額靠右 */
.content-right {
  text-align: right;
}

.text-danger {
  color: #dc3545;
  font-weight: bold;
}

.book-img {
  width: 150px;        
  height: auto;        /* 高度自動等比例縮放*/
  display: inline-block;
}
</style>