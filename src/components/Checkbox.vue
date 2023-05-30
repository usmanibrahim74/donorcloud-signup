<template>
  <div class="font-medium tracking-wide">
    <label :for="id" class="flex ml-2 gap-3 text-sm cursor-pointer">
      <div
        class="w-5 h-5 mt-0.5 rounded border-2 relative"
        :class="[
          isChecked ? 'border-green-500 bg-green-500' : 'border-gray-400',
        ]"
      >
        <div class="w-4 h-4 absolute top-0 text-white" v-if="isChecked">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class=""
            width="16"
            height="16"
            viewBox="0 0 40 40"
            stroke-width="4"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M2 2h36v36H2z" />
            <path d="M10 20l7 7l14 -14" />
          </svg>
        </div>
      </div>
      <span class="flex-1 select-none">
        <slot> Label </slot>
      </span>
    </label>
    <HasError class="ml-5 mt-1" v-if="hasError" :message="message" />
    <input
      :checked="isChecked"
      :value="value"
      @input="update"
      :id="id"
      type="checkbox"
      class="appearance-none hidden"
    />
  </div>
</template>

<script>
import HasError from "./HasError.vue";
import { uuid } from "vue-uuid";
import { computed } from "@vue/reactivity";
export default {
  data() {
    return {
      id: uuid.v4(),
    };
  },
  components: {
    HasError,
  },
  props: {
    value: { type: [Number, String, Boolean, Array] },
    trueValue: { default: true },
    falseValue: { default: false },
    modelValue: {
      type: [Number, String, Boolean, Array],
      default: false,
    },
    text: {
      type: String,
      default: "Label",
    },
    field: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    errors: {
      default: false,
    },
  },
  setup(props, { emit }) {
    const isChecked = computed(() => {
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value);
      }
      return props.modelValue === props.trueValue;
    });

    const hasError = computed({
      get: () => props.errors?.has(props.field),
    });
    const message = computed({
      get: () => props.errors?.get(props.field),
    });
    const update = (event) => {
      let checked = event.target.checked;
      if (props.modelValue instanceof Array) {
        let newValue = [...props.modelValue];
        if (checked) {
          newValue.push(props.value);
        } else {
          newValue.splice(newValue.indexOf(props.value), 1);
        }
        emit("update:modelValue", newValue);
      } else {
        emit("update:modelValue", checked ? props.trueValue : props.falseValue);
      }
    };
    return {
      hasError,
      isChecked,
      update,
      message,
    };
  },
};
</script>
