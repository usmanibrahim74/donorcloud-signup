<template>
  <div class="w-full relative group" :class="[active ? '' : '']">
    <div
      class="text-base bg-white text-white relative font-semibold z-10 rounded-full h-10 w-10 mx-auto flex items-center justify-center"
      :class="[
        completed
          ? 'bg-secondary'
          : active
          ? 'bg-primary' 
          : 'bg-gray-400',
        ,
      ]"
    >
      <span class="absolute text-primary text-xs -top-5">Step {{ step }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class=""
        width="40"
        height="40"
        viewBox="0 0 40 40"
        stroke-width="4"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M2 2h36v36H2z" />
        <path d="M10 20l7 7l14 -14" />
      </svg>
    </div>
    <div
      class="w-full group-last:w-1/2 group-last:hidden group-first:left-1/2 left-1/2 absolute top-1/2 -translate-y-1/2 right-0 h-[5px]"
      :class="[completed ? 'bg-secondary' : 'bg-gray-400']"
    ></div>
  </div>
</template>
<script>
import { computed } from "@vue/reactivity";

export default {
  props: {
    step: {
      type: Number,
      required: true,
    },

    current: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const active = computed(() => {

      return props.current == props.step;
    });
    const completed = computed(() => {
      return props.current > props.step;
    });

    return {
      active,
      completed,
      step: props.step,
    };
  },
};
</script>
