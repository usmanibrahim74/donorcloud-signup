<template lang="">
  <div class="pt-5 mt-10 md:px-5">
    <h3 class="font-sans text-3xl font-bold mb-4">Subtotal</h3>
    <div class="font-sans flex justify-between text-lg">
      <span>Single Payment</span>
      <span>{{ $formatAmount(oneTime) }}</span>
    </div>
    <div class="font-sans flex justify-between text-lg">
      <span>Monthly Payment</span>
      <span>{{ $formatAmount(monthly) }}</span>
    </div>
    <div
      class="mt-2 py-4 border-t-2 flex justify-between text-2xl font-bold mb-4"
    >
      <h3 class="font-sans">Total Donations</h3>
      <span class="font-sans">{{ $formatAmount(oneTime + monthly) }}</span>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
export default {
  props: {
    oneTime: {
      type: Number,
      required: 0,
    },
    monthly: {
      type: Number,
      required: 0,
    },
  },
};
</script>
<style lang=""></style>
