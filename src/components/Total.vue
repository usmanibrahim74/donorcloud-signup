<template lang="">
  <div class="bg-primary-light min-h-[10rem] p-4">
    <div class="flex flex-col gap-4 max-w-[650px] mx-auto py-7 text-white">
      <h3 class="text-3xl font-bold mb-4">Subtotal</h3>
      <div class="flex justify-between text-lg">
        <span>Single Payment</span>
        <span>{{oneTime}}</span>
      </div>
      <div class="flex justify-between text-lg">
        <span>Monthly Payment</span>
        <span>{{monthly}}</span>
      </div>
      <div
        class="mt-2 py-4 border-t-2 flex justify-between text-2xl font-bold mb-4"
      >
        <h3>Total Donations</h3>
        <span>{{ oneTime + monthly }}</span>
      </div>
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
