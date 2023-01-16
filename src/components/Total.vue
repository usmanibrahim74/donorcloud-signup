<template lang="">
  <div class="bg-primary-light min-h-[10rem] p-4">
    <div class="flex flex-col gap-4 max-w-[650px] mx-auto py-7 text-white">
      <h3 class="text-3xl font-bold mb-4">Subtotal</h3>
      <div class="flex justify-between text-lg">
        <span>Single Payment</span>
        <span>{{total_onetime}}</span>
      </div>
      <div class="flex justify-between text-lg">
        <span>Monthly Payment</span>
        <span>{{total_monthly}}</span>
      </div>
      <div
        class="mt-2 py-4 border-t-2 flex justify-between text-2xl font-bold mb-4"
      >
        <h3>Total Donations</h3>
        <span>{{ total_onetime + total_monthly }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
export default {
  props: {
    state: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const total_onetime = computed(() => {
      return props.state.donations
        .filter((d) => !d.monthly)
        .map((d) => (d.fixed_amount ?? d.amount ?? 0) * d.qty)
        .reduce((a,b) => a+b,0)
    });
    const total_monthly = computed(() => {
      return props.state.donations
        .filter((d) => d.monthly)
        .map((d) => (d.fixed_amount ?? d.amount ?? 0) * d.qty)
        .reduce((a,b) => a+b,0)
    });

    return {
      total_onetime, total_monthly
    }
  },
};
</script>
<style lang=""></style>
