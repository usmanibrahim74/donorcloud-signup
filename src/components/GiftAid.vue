<template lang="">
  <div class="mt-2 p-6 border border-black rounded-3xl">
    <div>
      <img class="float-right max-w-[14rem]" src="@/assets/sign.png" />
      <h2 class="font-bold text-lg">
        Increase the value of your fundraiser donation by 25%
      </h2>
      <p class="text-sm">
        With Gift Aid, your donation of £50.00 would be worth £62.50 at no extra
        cost to you.
      </p>
    </div>
    <p class="p-2 bg-gray-100 mt-6 mb-4 rounded-md text-sm clear-left">
      I am a UK taxpayer and I understand that if I pay less Income and/or
      Capital Gains Tax than the amount of Gift Aid claimed on all my donations
      in the relevant tax year, it is my responsibility to pay any difference. I
      understand that Gift Aid will fund administrative costs as well as our
      charitable programmes.
    </p>
    <label class="flex gap-3 items-center">
      <input :value="true" v-model="model" type="checkbox" class="scale-150" />
      <span> I Agree, I would like to boost my donation with Gift Aid </span>
    </label>
    <HasError class="ml-5 mt-1" v-if="error" message="The gift aid field is required" />
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
import HasError from "./HasError.vue";
export default {
  components: {
    HasError,
  },
  props: {
    modelValue: {
      required: true,
    },
    error: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    return {
      model,
    };
  },
};
</script>
<style lang=""></style>
