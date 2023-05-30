<template lang="">
  <form class="flex flex-col gap-3">
    <h4
      class="font-sans letter tracking-wide uppercase text-xl mb-2 text-gray-500"
    >
      Step 1: Login Information
    </h4>

    <Input
      v-model="model.name"
      :errors="errors"
      field="name"
      placeholder="Full Name"
      required
      label="Enter Full Name"
    />
    <Input
      v-model="model.email"
      :errors="errors"
      field="email"
      type="email"
      required
      placeholder="Email"
      label="Enter an email address"
    />
    <Input
      v-model="model.password"
      :errors="errors"
      field="password"
      type="password"
      required
      placeholder="Password"
      label="Enter a password"
    />
    <Input
      v-model="model.password_confirmation"
      :errors="errors"
      field="password_confirmation"
      type="password"
      required
      placeholder="Confirm Password"
      label="Confirm your password"
    />

    <Checkbox
      :errors="errors"
      field="agreed"
      class="my-3"
      required
      :value="1"
      v-model="model.agreed"
      :true-value="1"
      :false-value="0"
    >
      Please Confirm you agree to our
      <a href="/terms_of_user" class="text-secondary font-medium">terms of use</a>, and
      <a href="/privacy_policy" class="text-secondary font-medium">privacy policy</a> by
      ticking the box.
    </Checkbox>
    <Button
      :disabled="!model.agreed || model.busy"
      :class="[!model.agreed || model.busy ? 'bg-gray-400' : 'bg-secondary']"
      type="submit"
      class="flex items-center gap-3 justify-center"
    >
      <template v-if="!model.busy">
        <span>Next Step</span>
        <IconArrowRight class="w-5 h-5 mt-0.5" />
      </template>
      <span v-else>Saving...</span>
    </Button>

    <div class="text-sm font-medium flex gap-1 items-center justify-center">
      <span>Need help?</span>
      <a href="#" class="text-secondary">Chat to us</a>
    </div>
  </form>
</template>
<script>
import { ref, computed } from "@vue/reactivity";
import Input from "../components/Input.vue";
import Button from "../components/Button.vue";
import Checkbox from "../components/Checkbox.vue";
import IconArrowRight from "../components/icons/IconArrowRight.vue";
export default {
  components: {
    Input,
    Button,
    Checkbox,
    IconArrowRight,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    alreadyCreated: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    // const errors = [];
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
