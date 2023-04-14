<template lang="">
  <h4 class="font-bold text-lg mt-5 mb-2">Choose Payment Method</h4>
  <RadioGroup v-model="model">
    <div class="flex gap-2">
      <RadioGroupOption
        class="w-full"
        as="template"
        v-for="method in methods"
        :key="method.name"
        :value="method.id"
        :disabled="method.id === 'paypal' && hasMonthly"
        v-slot="{ active, checked, disabled }"
      >
        <div
          :title="
            disabled
              ? 'This method is disabled because you have a monthly donation'
              : ''
          "
          :class="[
            active
              ? 'ring-2 ring-primary-100 ring-opacity-60 ring-offset-2 ring-offset-primary-100'
              : '',
            disabled
              ? 'bg-gray-200 cursor-default'
              : checked
              ? 'cursor-pointer bg-primary-light text-white '
              : 'cursor-pointer bg-primary-50 ',
          ]"
          class="relative flex rounded-lg px-5 py-4 shadow-md focus:outline-none"
        >
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="checked ? 'text-white' : 'text-gray-900'"
                  class="font-medium"
                >
                  <div class="flex gap-2 items-center">
                    <CreditCardIcon class="w-4" v-if="method.id == 'credit'" />
                    <IconPaypalCard class="w-4 h-4" v-else />
                    {{ method.name }}
                  </div>
                </RadioGroupLabel>
              </div>
            </div>
            <div v-show="checked" class="shrink-0 text-white">
              <div
                class="rounded-full bg-white bg-opacity-20 h-6 w-6 flex justify-center items-center"
              >
                <CheckIcon class="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
<script>
import { computed } from "@vue/reactivity";
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";
import IconPaypalCard from "@/components/icons/IconPaypalCard.vue";
import { CheckIcon, CreditCardIcon } from "@heroicons/vue/20/solid";
export default {
  components: {
    RadioGroup,
    RadioGroupLabel,
    RadioGroupOption,
    CheckIcon,
    CreditCardIcon,
    IconPaypalCard,
  },
  props: {
    modelValue: {
      required: true,
    },
    hasMonthly: {
      type: Boolean,
      required: true,
    },
    enableStripe: {
      type: Boolean,
      required: true,
    },
    enablePaypal: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const methods = computed(() => {
      let methods = [];
      if (props.enableStripe) {
        methods.push({
          id: "credit",
          name: "Credit Card",
        });
      }
      if (!props.hasMonthly && props.enablePaypal) {
        methods.push({
          id: "paypal",
          name: "Paypal",
        });
      }
      return methods;
    });

    return {
      model,
      methods,
    };
  },
};
</script>
<style lang=""></style>
