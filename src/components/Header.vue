<template lang="">
    <!-- <header
      class="relative bg-primary px-4 min-h-[12rem] flex justify-center items-center"
    >
    <div class="max-w-[400px]">

      <h2 class="text-white font-semibold text-3xl sr-only">Donor Cloud</h2>
      <img :src="$getAsset('/logo-wide.png')" alt="">
    </div>
    </header> -->

    <div class="relative">
      <div @click="$emit('close')" class="cursor-pointer absolute right-0 top-0 rounded-full opacity-80 text-gray-800 h-16 w-16">
      <XCircleIcon />
    </div>
    </div>
</template>
<script>
import { XCircleIcon } from '@heroicons/vue/20/solid';
export default {
    components:{
      XCircleIcon
    }
}
</script>
<style lang="">
    
</style>