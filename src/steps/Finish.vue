<template lang="">
  <form @submit.prevent="submit" class="flex flex-col gap-3">
    <h4
      class="font-sans letter tracking-wide uppercase text-xl mb-2 text-gray-500"
    >
      Registration Completed!
    </h4>

    <p class="text-gray-500">
      Thanks for creating an account with us! Our team is setting up your portal
      and it should be ready in the next
      <span class="font-bold text-secondary">30 minutes</span> or so.
    </p>
    <p class="text-gray-900 font-bold mt-6 mb-8">
      Please wait for our email with your charity login information.
    </p>

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
};
</script>
