<template lang="">
  <div>
    <label v-if="hasLabel" class="text-sm text-black font-medium" :for="uid">{{
      label
    }}</label>
    <div class="max-w-full w-full relative mb-4 flex items-stretch focus-within:border-black">
      <input
        :type="type"
        v-model="model"
        @focus="focused"
        @blur="focused"
        class="w-full rounded border px-4 py-2 text-sm outline-none rounded-l rounded-r-none border-r-0"
        :class="[
          hasError ? 'bg-red-300 border-red-400' : 'bg-white border-gray-300 focus:border-gray-500',
        ]"
        :id="uid"
        :required="required"
        :placeholder="placeholder"
      />
      <span v-if="isGroup"
        class="flex items-center border whitespace-nowrap rounded-r border-l-0 border-solid px-3 py-[0.25rem] text-center text-base font-bold leading-[1.6] text-gray-700  dark:text-neutral-200 dark:placeholder:text-neutral-200"
        :class="[
          hasError ? 'bg-red-50 border-red-300' : 'bg-white border-gray-300',
          is_focused ? 'border-gray-500' : 'border-gray-300'
        ]"
        ><slot name="right-group"> </slot>
      </span>
    </div>
    <HasError class="mt-1" v-if="hasError" :message="message" />
  </div>
</template>
<script>
import HasError from "./HasError.vue";
import { computed, ref } from "@vue/reactivity";
import { uuid } from "vue-uuid";

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
    errors: {
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    field: {
      type: String,
      default: "",
    },
    label: {
      default: "",
    },

    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const hasLabel = computed({
      get: () => props.label && props.label != "",
    });
    const hasError = computed({
      get: () => props.errors?.has(props.field),
    });
    const message = computed({
      get: () => props.errors?.get(props.field),
    });
    const uid = uuid.v4();
    const is_focused = ref(false)
    const focused = () => {
      is_focused.value = !is_focused.value
    }
    return {
      model,
      message,
      uid,
      hasLabel,
      hasError,
      focused,
      is_focused
    };
  },
};
</script>
<style lang=""></style>
