<template lang="">
  <div>
    <form @submit.prevent="submit" class="flex flex-col gap-3">
      <h4 class="font-sans font-bold text-lg mb-2">Personal Information</h4>
      <div class="grid grid-cols-3 gap-3">
        <SelectBox
          v-model="model.title"
          :options="title"
          placeholder="Title"
          track-by="value"
          label="name"
          class="w-full z-10"
          field="title"
        />
        <Input
          v-model="model.first_name"
          :error="errors.includes('first_name')"
          field="first name"
          placeholder="First Name"
        />
        <Input
          v-model="model.last_name"
          :error="errors.includes('last_name')"
          field="last name"
          placeholder="Last Name"
        />
      </div>
      <Input
        v-model="model.address_line_1"
        :error="errors.includes('address_line_1')"
        field="address 1"
        placeholder="Address 1"
      />
      <Input
        v-model="model.address_line_2"
        :error="errors.includes('address_line_2')"
        field="address 2"
        placeholder="Address 2"
      />
      <Input
        v-model="model.address_line_3"
        :error="errors.includes('address_line_3')"
        field="address 3"
        placeholder="Address 3"
      />
      <div class="grid grid-cols-2 gap-3">
        <Input
          v-model="model.city"
          :error="errors.includes('city')"
          field="city"
          placeholder="City"
        />
        <Input
          v-model="model.post_code"
          :error="errors.includes('post_code')"
          field="post code"
          placeholder="Post code"
        />
      </div>
      <SelectBox
        v-model="model.country"
        :options="countries"
        placeholder="Country"
        track-by="code"
        label="name"
        class="w-full z-10"
        :error="errors.includes('country')"
        field="country"
      />
      <Input
        type="email"
        :error="errors.includes('email')"
        field="email"
        v-model="model.email"
        placeholder="Email Address"
      />
      <Input
        v-model="model.phone"
        :error="errors.includes('phone')"
        field="phone number"
        placeholder="Phone Number (Optional)"
      />
      <h4 class="font-sans font-bold text-lg mt-5 mb-2">
        Additional Information
      </h4>
      <Input
        v-model="model.reason"
        :error="errors.includes('reason')"
        field="reason"
        placeholder="Reason For Donation (Optional)"
      />
      <Textarea
        v-model="model.notes"
        :error="errors.includes('notes')"
        field="notes"
        placeholder="Notes (Optional)"
      />
      <GiftAid v-model="model.gift_aid" :error="errors.includes('gift_aid')" />

      <div>
        <h4 class="font-sans font-bold text-lg mt-5 mb-2">
          How would you like to be contacted?
        </h4>
        <div class="flex gap-3">
          <label>
            <input
              type="radio"
              v-model="model.contact_me_through"
              name="contact_me_through"
              value="email"
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              v-model="model.contact_me_through"
              name="contact_me_through"
              value="email"
            />
            Phone
          </label>
          <label>
            <input
              type="radio"
              v-model="model.contact_me_through"
              name="contact_me_through"
              value="email"
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              v-model="model.contact_me_through"
              name="contact_me_through"
              value="email"
            />
            Email
          </label>
        </div>
      </div>
      <PaymentMethod v-model="model.payment_type" :hasMonthly="hasMonthly" />
      <label class="flex gap-2 mt-4">
        <input
          type="checkbox"
          v-model="model.contact_me_through"
          name="contact_me_through"
          value="email"
        />
        I agree to the terms and conditions
      </label>
      <div class="flex items-center justify-center mt-8 gap-4">
        <Button class="px-3" text="Back" @click="$emit('backward')" />
        <Button type="submit" text="Proceed to payment" active />
      </div>
    </form>
  </div>
</template>
<script>
import countries from "@/data/countries.json";
import title from "@/data/title.json";
import SelectBox from "../components/SelectBox.vue";
import Button from "../components/Button.vue";
import Input from "../components/Input.vue";
import Textarea from "../components/Textarea.vue";
import GiftAid from "../components/GiftAid.vue";
import PaymentMethod from "../components/PaymentMethod.vue";
import { ref, computed } from "@vue/reactivity";
export default {
  components: {
    Button,
    SelectBox,
    Input,
    Textarea,
    GiftAid,
    PaymentMethod,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    hasMonthly: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });

    const submit = () => {
      if (validate()) {
        emit("forward", model);
      }
    };

    const errors = ref([]);
    const validate = () => {
      const required = [
        "first_name",
        "last_name",
        "address_line_1",
        // "address_line_2",
        // "address_line_3",
        "city",
        "post_code",
        "country",
        "email",
        "phone",
        // "reason",
        // "notes",
        // 'gift_aid',
        "payment_method",
      ];
      const form = model.value;
      errors.value = required.filter((r) => {
        const hasError = [null, 0, ""].includes(form[r]);
        return hasError;
      });
      return !errors.value.length;
    };

    return {
      model,
      countries,
      submit,
      errors,
      title,
    };
  },
};
</script>
<style lang=""></style>
