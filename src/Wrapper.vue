<template lang="">
  <Button
    text="Donate"
    @click="open = true"
    class="fixed right-10 bottom-6"
    active
  />
  <VueFinalModal
    v-slot="{ close }"
    overlay-class=""
    classes="flex items-center justify-center px-5"
    content-class="w-full max-w-[1400px] h-[calc(100vh_-_20px)] overflow-hidden rounded-3xl"
    v-model="open"
    @closed="emitClosed"
  >
    <div class="flex flex-col bg-white relative h-full">
      
      

      <Footer />
    </div>
  </VueFinalModal>
</template>
<script>
import Button from "./components/Button.vue";
import { VueFinalModal } from "vue-final-modal";
import { ref } from "@vue/reactivity";
import { XCircleIcon } from "@heroicons/vue/20/solid";
import Footer from "./components/Footer.vue";
export default {
  components: {
    VueFinalModal,
    Button,
    XCircleIcon,
    Footer
  },
  emits: ["closed"],
  setup(props,{emit}) {
    const open = ref(false);
    const emitClosed = ()=>{
        emit('closed');
    }
    return {
      open,
      emitClosed
    };
  },
};
</script>
<style lang=""></style>
