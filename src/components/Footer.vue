<template>
  <footer class="absolute bottom-0 w-full bg-primary px-4 min-h-[8rem] flex items-center text-white">
    <div class="max-w-[750px] mx-auto flex items-center gap-4">
      <h2 class="text-white font-semibold text-3xl sr-only">Donor Cloud</h2>
      <img :src="getAsset('/logo-wide.png')" class="max-w-[200px]" alt="" />
      <p class="mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, aliquid.</p>
    </div>
  </footer>
</template>
<script>
import { useAsset } from "@/use/useAsset";
export default {

  setup(){
    const { getAsset } =useAsset();
    return {
      getAsset
    }
  }

};
</script>
