<template lang="">
  <Listbox v-model="model">
    <div class="relative">
      <ListboxButton
        class="relative h-full w-full cursor-default rounded-3xl border-2 border-solid no-underline m-0 py-3.5 pl-5 pr-10 text-left focus:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-300 sm:text-sm"
        :class="[
          error ? 'bg-red-50 border-red-300' : 'bg-primary-100 border-primary',
        ]"
      >
        <span v-if="model && labelText" class="block truncate">
          {{ labelText }}
        </span>
        <span v-else class="text-gray-500 block truncate">
          {{ placeholder }}
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-if="options.length"
            v-slot="{ active, selected }"
            v-for="(option, i) in options"
            :key="i"
            :value="option[trackBy]"
            as="template"
          >
            <li
              class="relative cursor-pointer py-2 pl-10 pr-4 m-0"
              :class="[
                active ? 'bg-primary-100 text-primary' : 'text-gray-900',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium text-primary' : 'font-normal',
                  'block truncate',
                ]"
                >{{ option[label] }}</span
              >
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>

          <ListboxOption v-else disabled>
            <li class="relative py-2 pl-10 pr-4 m-0 text-gray-400">
              No {{ field }} found
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
      <HasError class="ml-5 mt-1" v-if="error" :message="message" />
    </div>
  </Listbox>
</template>
<script>
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import HasError from "./HasError.vue";
import { ref, reactive, computed } from "@vue/reactivity";
export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronUpDownIcon,
    HasError,
  },
  props: {
    modelValue: {
      default: null,
      required: true,
    },
    options: {
      type: Array,
      default: [],
    },
    label: {
      type: String,
      default: "text",
    },
    trackBy: {
      type: String,
      default: "value",
    },
    placeholder: {
      type: String,
      default: "Select",
    },
    error: {
      type: Boolean,
      default: false,
    },
    field: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "The :field field is required",
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    const labelText = computed(() => {
      const selected = props.options.find(
        (o) => o[props.trackBy] == model.value
      );
      return selected ? selected[props.label] : null;
    });
    const message = props.errorMessage.replace(":field", props.field).trim();
    return {
      model,
      labelText,
      message,
    };
  },
};
</script>
