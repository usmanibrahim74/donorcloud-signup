<template>
 <div class="footer">
   <div class="footer__item">
      <h3 class="footer__item__heading">Subtotal</h3>
      <div class="footer__item__payment">
         <p>Single Payment</p>
         <p class="amount">$ {{singlePayment}}</p>
      </div>
      <div class="footer__item__payment">
         <p>Monthly Payment</p>
         <p class="amount">$ {{monthlyPayment}}</p>
      </div>
      <hr>
      <div class="footer__item__payment">
         <p class="total">Total Donations</p>
         <p class="total-amount">$ {{singlePayment + monthlyPayment}}</p>
      </div>
   </div>
   <div class="footer__copyright">
     <p>Powered by Synergi Digital</p>
   </div>
 </div>
</template>
<script>
export default {
  props:[
    'donations'
  ],
  computed:{
    singlePayment()
    {
       let total = 0;
       this.donations.map(f => {
         if(f.monthly === false){
           return total += f.totalAmount != null ? f.totalAmount : (f.amount * f.qty)
         }
       })
       return total;
    },
    monthlyPayment()
    {
      let total = 0;
      this.donations.map(f => {
        if(f.monthly === true){
          return total += f.totalAmount != null ? f.totalAmount : (f.amount * f.qty)
        }
      })
      return total;
    },
  }
}
</script>
