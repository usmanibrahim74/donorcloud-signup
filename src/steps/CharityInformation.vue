<template lang="">
  <form class="flex flex-col gap-3">
    <h4
      class="font-sans letter tracking-wide uppercase text-lg md:text-xl mb-2 text-gray-500"
    >
      Step 3: Charity Information
    </h4>

    <Select
      v-model="model.charity"
      :options="charities"
      @search="searchCharities"
      placeholder="Charity Name"
      track-by="value"
      label="Start typing your charity name"
      class="mb-5"
      :fields="['charity', 'charity.reg_charity_number']"
      :errors="errors"
    />

    <div class="mb-4" v-if="model.charity">
      <label class="text-sm text-black font-medium">Selected charity:</label>
      <p class="font-bold text-gray-600 text-sm uppercase tracking-wide">
        {{ model.charity.charity_name }} <em>({{ model.charity.reg_charity_number }})</em>
      </p>
    </div>

    <div class="w-full">
      <GroupInput
        class="col-span-1"
        v-model="model.portal_address"
        :errors="errors"
        field="portal_address"
        placeholder="charity"
        required
        label="Choose your portal address"
        is-group
      >
        <template #right-group> .donorcloud.co.uk </template>
      </GroupInput>
    </div>
    <Checkbox
      :errors="errors"
      field="authorized"
      class="my-3"
      required
      :value="1"
      v-model="model.authorized"
      :true-value="1"
      :false-value="0"
    >
      I confirm that I'm authorised to create an account for this charity.
    </Checkbox>
    <Button
      :disabled="!model.authorized || model.busy"
      :class="[
        !model.authorized || model.busy ? 'bg-gray-400' : 'bg-secondary',
      ]"
      type="submit"
      class="flex items-center gap-3 justify-center"
    >
      <template v-if="!model.busy">
        <span>Complete Registration</span>
        <IconArrowRight class="w-5 h-5 mt-0.5" />
      </template>
      <span v-else>Saving...</span>
    </Button>
    <Button
      class="bg-gray-800 flex items-center gap-3 justify-center"
      @click="$emit('back')"
    >
      <IconArrowRight class="w-5 h-5 mt-0.5 rotate-180" />
      <span>Go Back</span>
    </Button>
  </form>
</template>
<script>
import { ref, computed } from "@vue/reactivity";
import Input from "../components/Input.vue";
import GroupInput from "../components/GroupInput.vue";
import Select from "../components/Select.vue";
import Button from "../components/Button.vue";
import Checkbox from "../components/Checkbox.vue";
import IconArrowRight from "../components/icons/IconArrowRight.vue";
import axios from "./../services/interceptor";
export default {
  components: {
    Input,
    GroupInput,
    Select,
    Button,
    Checkbox,
    IconArrowRight,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const errors = computed(() => {
      return model?.value?.errors;
    });
    const charities = ref([]);
    const searchCharities = async ({ search, loading }) => {
      try {
        if (search.length >= 3) {
          loading(true);
          const { data } = await axios.get(`/search-charities?query=${search}`);
          charities.value = data;
          loading(false);
        }
      } catch (e) {
        console.error(e);
        loading(false);
      }
    };

    return {
      model,
      errors,
      searchCharities,
      charities,
    };
  },
};
</script>
