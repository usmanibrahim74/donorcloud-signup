<template lang="">
  <button
    class="w-full no-underline border-primary border-2 text-sm font-medium rounded-3xl py-3.5 px-3 md:px-6"
    :class="[
      active ? 'bg-primary text-primary-50' : 'bg-primary-100 text-primary',
    ]"
    type="button"
  >
    <h3 class="font-sans text-xl font-medium">{{text}}</h3>
    <p class="font-sans font-extrabold text-lg">{{ formatAmount(amount) }}</p>
  </button>
</template>
<script>
import { useCurrency } from "@/use/useCurrency";
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "Text",
    },
    amount: {
      type: String,
      default: "3.00",
    },
  },
  setup(){
    const {formatAmount} = useCurrency();
    return {
      formatAmount
    }
  }
};
</script>
<style lang=""></style>
