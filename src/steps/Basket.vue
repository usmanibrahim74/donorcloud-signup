<template lang="">
  <div>
    <div class="flex flex-col gap-5 mb-4">
      <DonationItem
        v-model="model.donations[i]"
        v-for="(item, i) in model.donations"
        :key="i"
        @delete="del(i)"
        @edit="edit(i)"
      />
      <p
        class="font-sans text-center mt-4 mb-2 text-gray-400 text-2xl font-medium"
      >
        Further Support Us
      </p>
      <!-- <div class="flex gap-4 text-center mb-5">
        <SupportFee
          text="Admin Fee"
          amount="$3.00"
          :active="model.admin_fee"
          @click="model.admin_fee = !model.admin_fee"
        />
        <SupportFee
          text="Paper Receipt Fee"
          amount="$3.00"
          :active="model.paper_fee"
          @click="model.paper_fee = !model.paper_fee"
        />
      </div> -->

      <div class="flex gap-2">
        <Button
          class="w-full"
          @click="addAnother"
          active
          text="Make Another Donation"
        />
        <Button class="w-full" @click="proceed" text="Proceed To Checkout" />
      </div>
    </div>
  </div>
</template>
<script>
import DonationItem from "../components/DonationItem.vue";
import SupportFee from "../components/SupportFee.vue";
import Button from "../components/Button.vue";
import { computed } from "@vue/reactivity";
export default {
  components: {
    DonationItem,
    Button,
    SupportFee,
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

    const del = (i) => {
      model.value.donations.splice(i, 1);
      if (!model.value.donations.length) {
        addAnother();
      }
    };

    const addAnother = () => {
      emit("add-another");
    };

    const proceed = () => {
      emit("forward");
    };

    const edit = (index) => {
      emit("edit", index);
    };

    return {
      model,
      del,
      edit,
      addAnother,
      proceed,
    };
  },
};
</script>
<style lang=""></style>
