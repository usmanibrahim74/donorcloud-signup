
<script setup>
import { ref, toRefs, watch } from "@vue/reactivity"

const props = defineProps({
  isOpened: Boolean
})
const { isOpened } = toRefs(props)
const isShowing = ref(isOpened)
</script>
<template>
  <VueSidePanel v-model="isShowing" lock-scroll width="600px">
    <div style="padding-top: 70px; color: #f14668">
        <h3 class="smodal__title">Make a donation</h3>
        <p class="smodal_subtitle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
            cum similique! Reprehenderit dolorum quos ipsum inventore quidem
            soluta blanditiis
        </p>
    </div>
  </VueSidePanel>
</template>
