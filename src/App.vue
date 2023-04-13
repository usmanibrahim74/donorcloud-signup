<script>
import { reactive, ref, computed } from "@vue/reactivity";
import Api from "./services/api";
import { donation, donor } from "./data/sample";
import DonationStep from "./steps/Donation.vue";
import BasketStep from "./steps/Basket.vue";
import DetailsStep from "./steps/Details.vue";
import StripeComponent from "./components/Stripe.vue";
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
    StripeComponent,
    ThankyouStep,
    ProgressStep,
    Paypal,
    Title,
    Total,
    Wrapper,
  },
  computed: {},
  mounted() {
    this.getData();
  },
  setup() {
    const form = reactive({
      donor: { ...donor },
      donations: [],
      paypal: {
        purchase_id: null
      },
      stripe: {
        subscription_id: null,
        payment_intent_id: null,
      },
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
      state.currency = data.currency;
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
      const success = await handleStripePayment(token);
      if (success) {
        const response = await saveDonation();
        state.step = 5;
      }
      state.loading = false;
    };

    const handleStripePayment = async (token) => {
      const { title, first_name, last_name, email } = form.donor;
      const payload = {
        name: `${title} ${first_name} ${last_name}`,
        email: email,
        oneTimeDonation: getTotalAmount(computedProps.oneTimeDonations.value),
        monthlyDonation: getTotalAmount(computedProps.monthlyDonations.value),
        token: token,
      };

      try {
        const { data } = await Api.stripePayment(payload);
        if (data.secret) {
          const stripe = computedProps.stripe.value;
          const { paymentIntent, error: paymentIntentError } =
            await stripe.confirmCardPayment(data.secret);
        }

        form.stripe = {
          subscription_id: data.subscription_id ?? null,
          payment_intent_id: data.payment_intent_id ?? null,
        };

        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    };

    const handlePaypalDonation = async (order) => {
      if (order.status == "COMPLETED") {
        form.paypal.purchase_id = order.id;
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
      const payload = {
        donor: { ...form.donor },
        oneTimeDonations: [...computedProps.oneTimeDonations.value],
        monthlyDonations: [...computedProps.monthlyDonations.value],
        paypal: {...form.paypal},
        stripe: {...form.stripe},
      };

      const { data } = await Api.saveDonation(payload);
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

    const getTotalAmount = (donations) => {
      return donations
        .map((d) => d.fixed_amount ?? d.amount)
        .reduce((partialSum, a) => partialSum + parseFloat(a), 0);
    };

    const computedProps = {
      oneTimeDonations: computed(() => {
        return form.donations.filter((d) => !d.monthly);
      }),
      monthlyDonations: computed(() => {
        return form.donations.filter((d) => d.monthly);
      }),
      stripe: computed(() => {
        if (state.gatewayKeys?.stripe) {
          return Stripe(state.gatewayKeys.stripe);
        }
        return null;
      }),
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
      ...computedProps,
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
        <StripeComponent
          v-if="state.gatewayKeys.stripe"
          :customer="form.donor"
          :stripe="stripe"
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
