<template lang="">
  <button
    class="text-xs rounded py-3 px-6 block no-underline font-bold uppercase text-white !border-none"
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
