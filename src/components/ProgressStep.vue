<template>
  <div class="w-full relative group" :class="[active ? '' : '']">
    <div
      class="text-base border-[5px] bg-white relative font-semibold z-10 rounded-full h-10 w-10 mx-auto flex items-center justify-center"
      :class="[
        completed ? 'bg-primary border-primary' : '',
        active ? 'border-primary text-primary' : 'text-primary',
      ]"
    >
      <template v-if="!completed">
        {{ step }}
      </template>
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-check"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#FFFFFF"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </template>
    </div>
    <div
      class="w-full group-last:w-1/2 group-last:hidden group-first:left-1/2 left-1/2 absolute top-1/2 -translate-y-1/2 right-0 h-[5px]"
      :class="[completed ? 'bg-primary' : 'bg-gray-300']"
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
      if(props.current == 4 &&  props.step == 3){
        return true;
      }
      return props.current == props.step;
    });
    const completed = computed(() => {
      if(props.current == 4 &&  props.step == 3){
        return false;
      }
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
