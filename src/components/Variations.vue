<template lang="">
  <div>
    <div class="flex gap-2 flex-col md:flex-row">
      <ButtonSelect class="w-full"
        v-for="v in variations"
        @click="amount==v.amount? amount=0: amount=v.amount"
        :active="amount == v.amount"
        :text="`$${v.amount}`"
      />
    </div>
    <div
      v-if="selectedVariationIndex > -1"
      class="shadow bg-primary-100 rounded-3xl p-4 mt-2 relative arrow-up"
      :style="arrowVar"
    >
      <p class="text-primary text-base">
        {{ variations[selectedVariationIndex].description }}
      </p>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";
import ButtonSelect from './Button.vue';
export default {
  props: {
    modelValue: {
      required: true,
    },
    variations: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  components:{
      ButtonSelect,
  },
  setup(props, { emit }) {
    const amount = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const selectedVariationIndex = computed(() => {
      return props.variations.findIndex((v) => v.amount == amount.value);
    });

    const arrowVar = computed(() => {
      let percent = 0;
      switch (props.variations.length) {
        case 1:
          percent = 50;
          break;
        case 2:
          percent = 25;
          break;
        case 3:
          percent = 16.67;
          break;
        case 4:
          percent = 12.5;
          break;
        default:
          percent = 0;
      }
      let index = selectedVariationIndex.value;
      index = index > -1 ? index : 0;
      percent = percent + percent * 2 * index;
      return { "--position": percent + "%" };
    });

    return {
      amount,
      selectedVariationIndex,
      arrowVar,
    
    };
  },
};
</script>

<style>
.arrow-up {

  @apply before:content-[''] before:absolute before:top-0 before:-translate-y-full before:border-8 before:border-transparent before:border-b-primary-100;
}
.arrow-up::before{
  left: calc(var(--position) - 16px);
}
</style>
