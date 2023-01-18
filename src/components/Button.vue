<template lang="">
    <button
        class="border-primary border-2 text-sm font-medium rounded-3xl py-3.5 px-3 md:px-6 no-underline"
        :class="[
          active ?'bg-primary text-primary-50' : 'bg-primary-100 text-primary',
        ]"
        :type="type"
      >
        {{text}}
      </button>
</template>
<script>
export default {
    props:{
        active:{
            type: Boolean,
            default: false,
        },
        text:{
            type: String,
            default: "Button",
        },
        type:{
            type: String,
            default: "button",
        },
    }
}
</script>
<style lang="">
    
</style>