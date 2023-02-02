<script>
import { reactive, ref, computed } from "@vue/reactivity";
import Api from "./services/api";
import { donation, donor } from "./data/resets";
import DonationStep from "./steps/Donation.vue";
import BasketStep from "./steps/Basket.vue";
import DetailsStep from "./steps/Details.vue";
import Stripe from "./components/Stripe.vue";
import Paypal from "./components/Paypal.vue";
import ThankyouStep from "./steps/Thankyou.vue";
import ProgressStep from "./components/ProgressStep.vue";
import Title from "./components/Title.vue";
import Total from "./components/Total.vue";
import Wrapper from "./Wrapper.vue";

export default {
  name: "DonorCloud",
  components: {
    DonationStep,
    BasketStep,
    DetailsStep,
    Stripe,
    ThankyouStep,
    ProgressStep,
    Paypal,
    Title,
    Total,
    Wrapper,
  },
  computed: {
    monthlyDonations() {
      return this.form.donations.filter((d) => d.monthly);
    },
    oneTimeDonations() {
      return this.form.donations.filter((d) => !d.monthly);
    },
  },
  mounted(){
    this.getData();
  },
  setup() {
    const form = reactive({
      donor: { ...donor },
      donations: [],
      paypal_purchase_id: null,
    });

    const state = reactive({
      step: 1,
      editIndex: null,
      gatewayKeys: {
        stripe: null,
        paypal: null,
      },
      projects: [],
      admin_fee: 0,
      paymentType: null,
      donation: { ...donation },
      loading: false,
    });

    const getData = async () => {
      const { data } = await Api.fetchData();
      state.projects = data.projects;
      state.gatewayKeys.stripe = data.stripe_gateway;
      state.gatewayKeys.paypal = data.paypal_gateway;
      state.admin_fee = data.admin_fee;
    };

    const stepOneCompleted = () => {
      if (state.editIndex == null) {
        form.donations.push({ ...state.donation });
      } else {
        form.donations[state.editIndex] = { ...state.donation };
      }
      state.step = 2;
    };
    const stepTwoCompleted = () => {
      state.step = 3;
    };

    const edit = (index) => {
      state.editIndex = index;
      state.donation = {
        ...form.donations[index],
      };
      state.step = 1;
    };

    const add = () => {
      state.editIndex = null;
      state.donation = {
        ...donation,
      };
      state.step = 1;
    };

    const handleStripeDonation = async (token) => {
      const response = await saveDonation();
      if (response?.donor) {
        const { donor, oneOff, monthly } = response;
        const payload = {
          donor,
          oneOff,
          monthly,
          token,
        };

        const { data } = await Api.stripePayment(payload);

        state.loading = false;
        state.step = 5;
      }
    };

    const handlePaypalDonation = async (order) => {
      if (order.status == "COMPLETED") {
        form.paypal_purchase_id = order.id;
        const response = await saveDonation();
        state.loading = false;
        state.step = 5;
      }
    };

    const paymentTypeStep = (model) => {
      state.paymentType = model.value.payment_type;
      state.step = 4;
    };

    const saveDonation = async () => {
      const { data } = await Api.saveDonation(form);
      return data;
    };

    const handleClosed = () => {
      if (state.step == 5) {
        state.donation = { ...donation };
        form.donor = { ...donor };
        form.donations = [];
        state.step = 1;
      }
    };


    return {
      state,
      form,
      stepOneCompleted,
      stepTwoCompleted,
      edit,
      add,
      paymentTypeStep,
      handleClosed,
      handleStripeDonation,
      handlePaypalDonation,
      getData,
    };
  },
};
</script>
<template>
  <Wrapper @closed="handleClosed">
    <div class="max-w-[900px] mx-auto px-4">
      <Title />
      <div class="flex items-center max-w-[700px] mx-auto my-4">
        <progress-step
          v-for="(s, i) in 3"
          :key="i"
          :step="s"
          :current="state.step"
        />
      </div>
      <div class="max-w-[750px] mx-auto py-5 mb-10">
        <DonationStep
          v-model="state.donation"
          :donations="form.donations"
          @view-basket="state.step = 2"
          :projects="state.projects"
          v-show="state.step == 1"
          @forward="stepOneCompleted"
        />
        <BasketStep
          v-model="form"
          v-show="state.step == 2"
          @forward="stepTwoCompleted"
          @edit="edit"
          @add-another="add"
          :admin_fee="state.admin_fee"
        />
        <DetailsStep
          v-model="form.donor"
          v-show="state.step == 3"
          :hasMonthly="monthlyDonations.length > 0"
          @backward="state.step = 2"
          @forward="paymentTypeStep"
        />
        <Stripe
          v-if="state.gatewayKeys.stripe"
          :customer="form.donor"
          :public-key="state.gatewayKeys.stripe"
          v-show="state.step == 4 && state.paymentType == 'credit'"
          @backward="state.step = 3"
          @forward="handleStripeDonation"
          :loading="state.loading"
          @start-loading="state.loading = true"
          @error="state.loading = false"
        />
        <Paypal
          :client-id="state.gatewayKeys.paypal"
          :loading="state.loading"
          :donations="oneTimeDonations"
          :projects="state.projects"
          v-if="
            state.gatewayKeys.paypal &&
            state.step == 4 &&
            state.paymentType == 'paypal' &&
            monthlyDonations.length == 0
          "
          @backward="state.step = 3"
          @forward="handlePaypalDonation"
          @start-loading="state.loading = true"
          @error="state.loading = false"
        />
        <ThankyouStep v-if="state.step == 5" />

        <Total v-if="state.step < 5" :donations="form.donations" />
      </div>
    </div>
  </Wrapper>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap");
</style>
