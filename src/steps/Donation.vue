<template lang="">
  <form class="flex flex-col gap-4 mb-4" @submit.prevent="submit">
    <div class="flex gap-2">
      <Button
        class="w-full"
        @click="model.monthly = false"
        :active="!model.monthly"
        text="Single"
      />
      <Button
        class="w-full"
        @click="model.monthly = true"
        :active="model.monthly"
        text="Monthly"
      />
    </div>
    <SelectBox
      class="z-20"
      label="text"
      track-by="id"
      v-model="project_id"
      :options="projects"
      placeholder="Select Project"
      :error="errors.includes('project_id')"
      field="project"
    />
    <SelectBox
      class="z-10"
      label="text"
      track-by="id"
      v-model="donation_type_id"
      :options="donation_types"
      placeholder="Select Donation Type"
      :error="errors.includes('donation_type_id')"
      field="donation type"
    />
    <Variations v-model="model.amount" :variations="variations" />
    <AmountBox
      v-model="model.fixed_amount"
      :error="errors.includes('amount')"
      field="amount"
      errorMessage="Please select or enter amount"
    />
    <div class="flex justify-center">
      <Button type="submit" text="Add To Basket" active />
    </div>
  </form>
</template>
<script>
import { ref, reactive, computed } from "@vue/reactivity";
import SelectBox from "./../components/SelectBox.vue";
import Button from "../components/Button.vue";
import Variations from "./../components/Variations.vue";
import AmountBox from "../components/AmountBox.vue";

export default {
  components: {
    SelectBox,
    Button,
    Variations,
    AmountBox,
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
    const project_id = computed({
      get: () => model.value.project_id,
      set: (value) => {
        model.value.project = projects.find((p) => p.id == value);
        model.value.project_id = value;
      },
    });
    const donation_type_id = computed({
      get: () => model.value.donation_type_id,
      set: (value) => {
        model.value.donation_type = donation_types.find((p) => p.id == value);
        model.value.donation_type_id = value;
      },
    });

    const projects = [
      { text: "Project 1", id: 1 },
      { text: "Project 2", id: 2 },
    ];

    const donation_types = [
      { text: "Type 1", id: 1 },
      { text: "Type 2", id: 2 },
    ];
    const variations = [
      {
        id: 1,
        amount: 10,
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis magnam hic nobis reiciendis laboriosam dolorem deserunt dolorum maxime delectus labore?",
      },
      {
        id: 2,
        amount: 20,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et fugiat nostrum omnis nobis ex? Aut.",
      },
      {
        id: 3,
        amount: 50,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit culpa explicabo perspiciatis nisi debitis nesciunt molestias blanditiis quod nam laboriosam! Cupiditate?",
      },
      {
        id: 4,
        amount: 100,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, debitis. Asperiores.",
      },
    ];

    const errors = ref([]);

    const validate = () => {
      const required = ["donation_type_id", "project_id", "amount"];
      const form = model.value;
      errors.value = required.filter((r) => {
        if (r == "amount" && (form.amount || form.fixed_amount)) {
          return false;
        }
        const hasError = [null, 0, ""].includes(form[r]);
        return hasError;
      });
      return !errors.value.length;
    };

    const submit = () => {
      if (validate()) {
        emit("forward");
      }
    };

    return {
      project_id,
      donation_type_id,
      model,
      projects,
      donation_types,
      variations,
      errors: errors,
      submit,
    };
  },
};
</script>
