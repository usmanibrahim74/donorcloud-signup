<template>
  <input
    ref="inputRef"
    type="text"
    v-model="model"
  />
</template>

<script>
import { useCurrencyInput } from 'vue-currency-input'
import { computed } from "@vue/reactivity";

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
    options: Object
  },
  setup(props, { emit }) {
    const model = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  });
    const { inputRef } = useCurrencyInput(props.options)

    return { inputRef, model }
  }
}
</script>