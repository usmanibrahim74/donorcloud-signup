<template lang="">
  <form @submit.prevent="submit" class="flex flex-col gap-3">
    <h4
      class="font-sans letter tracking-wide uppercase text-xl mb-2 text-gray-500"
    >
      Step 2: Verify Your Email
    </h4>

    <p class="text-gray-500">
      A one time code has been send to the email you provided, Please enter it
      below to continue
    </p>
    <Input
      v-model="model.code"
      :errors="errors"
      field="code"
      placeholder="Code"
      label="Enter your one time code"
    />
    <Button
      :disabled="model.busy"
      :class="[model.busy ? 'bg-gray-400' : 'bg-secondary']"
      type="submit"
      class="flex items-center gap-3 justify-center"
    >
      <template v-if="!model.busy">
        <span>Next Step</span>
        <IconArrowRight class="w-5 h-5 mt-0.5" />
      </template>
      <span v-else>Verifying...</span>
    </Button>
    <Button class="bg-gray-800 flex items-center gap-3 justify-center" @click="$emit('back')">
      <IconArrowRight class="w-5 h-5 mt-0.5 rotate-180" />
      <span>Go Back</span>
    </Button>
  </form>
</template>
<script>
import { ref, computed } from "@vue/reactivity";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import IconArrowRight from "../components/icons/IconArrowRight.vue";
export default {
  components: {
    Input,
    Button,
    IconArrowRight,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const errors = computed(() => {
      return model?.value?.errors;
    });
    return {
      model,
      errors,
    };
  },
};
</script>
