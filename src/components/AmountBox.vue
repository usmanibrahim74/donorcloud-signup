<template lang="">
  <div>
    <CurrencyInput
      class="font-medium text-sm block w-full rounded-3xl border-2 py-3.5 px-4"
      :class="[
        error
          ? 'bg-red-50 border-red-400 text-red-400'
          : 'bg-primary-100 border-primary text-primary',
      ]"
      v-model="model"
      :options="options"
      placeholder="Amount"
    />
    <HasError class="ml-5 mt-1" v-if="error" :message="message" />
  </div>
</template>
<script>
import HasError from "./HasError.vue";
import CurrencyInput from "./CurrencyInput.vue";
import { computed } from "@vue/reactivity";
import {useCurrency} from "@/use/useCurrency";

export default {
  props: {
    modelValue: {

      required: true,
    },
    error: {
      type: Boolean,
      default: false,
    },
    field: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "The :field field is required",
    },
  },
  components: {
    HasError,
    CurrencyInput,
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const message = props.errorMessage.replace(":field", props.field).trim();
    const { currency_code } = useCurrency();
    const options = { currency:  currency_code};
    return {
      options,
      model,
      message,
    };
  },
};
</script>
<style lang=""></style>
