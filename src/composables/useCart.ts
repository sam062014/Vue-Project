import { ref, computed, reactive } from 'vue';

export function useCart() {
  // 購物車屬性
  const cartForm = reactive({
    price : 100,//單價
    quantity :1,//數量
    hasDiscount: false,//是否有折扣
    errorMessages:''
  })

  async function increase() {
    cartForm.quantity++;
    if(cartForm.quantity>0){
      cartForm.errorMessages='';
    }
  }

  async function decrease() {
    cartForm.quantity--;
    if(cartForm.quantity<0){
      cartForm.quantity=0;
      cartForm.errorMessages='商品數量不可為負數!';
    }
  }

  const totalPrice = computed(()=>{
    let total = cartForm.price * cartForm.quantity;
    if(cartForm.hasDiscount === true){
      total=Math.round(total * 0.8)
    }
    return total;
  })

  return{cartForm,totalPrice,increase,decrease};
  
}