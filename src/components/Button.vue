<template lang="">
  <button
    class="text-white font-bold rounded text-base py-3.5 px-3 md:px-6 no-underline border-none"
    :type="type"
  >
    <slot>
      {{ text }}
    </slot>
  </button>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: "Button",
    },
    type: {
      type: String,
      default: "button",
    },
  },
};
</script>
<style lang=""></style>
