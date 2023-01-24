<template lang="">
  <div>
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
        label="title"
        track-by="id"
        v-model="project_id"
        :options="projects"
        placeholder="Select Project"
        :error="errors.includes('project_id')"
        field="project"
      />
      <SelectBox
        class="z-10"
        label="name"
        track-by="id"
        v-model="donation_type_id"
        :options="donation_types"
        placeholder="Select Donation Type"
        :error="errors.includes('donation_type_id')"
        field="donation type"
      />
      <Variations
        v-if="variations.length"
        v-model="model.amount"
        :variations="variations"
      />
      <AmountBox
        v-if="!model.amount"
        v-model="model.fixed_amount"
        :error="errors.includes('amount')"
        field="amount"
        errorMessage="Please select or enter amount"
      />
      <div class="flex justify-center">
        <Button type="submit" text="Add To Basket" active />
      </div>
    </form>
  </div>
</template>
<script>
import { ref, reactive, computed } from "@vue/reactivity";
import SelectBox from "./../components/SelectBox.vue";
import Button from "../components/Button.vue";
import Variations from "./../components/Variations.vue";
import AmountBox from "../components/AmountBox.vue";
import Api from "../services/api";

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
    projects: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const donation_types = computed(() => {
      if(model.value.project?.donation_types){
        return model.value.project?.donation_types;
      }
      return [];
    });
    const variations = computed(() => {
      if(model.value.project?.variations){
        return model.value.project?.variations;
      }
      return [];
    });
    const project_id = computed({
      get: () => model.value.project_id,
      set: (value) => {
        const project = props.projects.find((p) => p.id == value);
        variations.value = project.variations;
        donation_types.value = project.donation_types;
        model.value.project = project;
        model.value.project_id = value;
        model.value.donation_type_id = null;
        model.value.amount = null;
      },
    });

    const donation_type_id = computed({
      get: () => model.value.donation_type_id,
      set: (value) => {
        model.value.donation_type = donation_types.value.find(
          (p) => p.id == value
        );
        model.value.donation_type_id = value;
      },
    });

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
      console.log(errors.value);
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
      donation_types,
      variations,
      errors: errors,
      submit,
    };
  },
};
</script>
