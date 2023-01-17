<template lang="">
  <div
    class="flex flex-col gap-8 border-primary border-2 p-5 rounded-2xl bg-primary-100"
  >
    <div class="flex gap-2 justify-between">
      <div class="flex flex-col gap-1">
        <h4 class="font-bold text-xl text-black">{{ model.project.title }}</h4>
        <p class="text-sm">{{ model.donation_type.name }}</p>
      </div>
      <p class="text-gray-600 text-lg font-medium">
        {{ $formatAmount(model.fixed_amount ?? model.amount) }}
        {{ model.monthly ? 'monthly' : '' }}
      </p>
    </div>
    <div class="flex gap-2 justify-between">
      <div class="flex gap-4 items-center">
        <button
          type="button" :disabled="model.qty<=1" @click="decrement"
          class="flex justify-center items-center border border-primary bg-white rounded h-7 w-7"
        >
          <MinusIcon class="w-5 h-5" />
        </button>
        <span class="font-medium text-2xl">{{ model.qty }}</span>
        <button @click="increment"
          type="button"
          class="flex justify-center items-center border border-primary bg-white rounded h-7 w-7"
        >
          <PlusIcon class="w-5 h-5" />
        </button>
      </div>
      <div class="flex gap-4 items-center">
        <button class="bg-transparent border-transparent text-gray-600" @click="del">
          <TrashIcon class="w-7 h-7" />
        </button>
        <button class="bg-transparent border-transparent text-gray-600" @click="edit">
          <PencilSquareIcon class="w-7 h-7" />
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  PlusIcon,
  MinusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/vue/20/solid";
import { computed } from "@vue/reactivity";
export default {
  components: {
    PlusIcon,
    MinusIcon,
    TrashIcon,
    PencilSquareIcon,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const increment = () => {
      model.value.qty++;
    }

    const decrement = () => {
      if(model.value.qty>1)
      model.value.qty--;
    }

    const del = () =>{
      emit('delete');
    }
    const edit = () =>{
      emit('edit');
    }
    

    return {
      model,
      increment,
      decrement,
      del,
      edit
    };
  },
};
</script>
<style lang=""></style>
