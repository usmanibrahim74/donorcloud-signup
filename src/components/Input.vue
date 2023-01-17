<template lang="">
  <div>
    <input
      :type="type"
      v-model="model"
      class="flex w-full rounded-3xl border-2 px-6 py-3.5"
      :class="[
        error ? 'bg-red-50 border-red-300' : 'bg-primary-100 border-primary',
      ]"
      :placeholder="placeholder"
  />
  <HasError class="ml-5 mt-1" v-if="error" :message="message" />
  </div>
</template>
<script>
import HasError from "./HasError.vue";
import { computed } from "@vue/reactivity";
export default {
  components: {
    HasError,
  },
  props: {
    modelValue: {
      required: true,
    },
    placeholder: {
      type: String,
      default: "Enter",
    },
    type: {
      type: String,
      default: "text",
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
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const message = props.errorMessage.replace(":field", props.field).trim();

    return {
      model,
      message,
    };
  },
};
</script>
<style lang=""></style>
