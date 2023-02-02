<script>
import { reactive, ref, computed } from "@vue/reactivity";
import { onMounted } from "vue";
import Api from "./services/api";
import countries from "./data/countries.json";
import { donation, donor } from "./data/resets";
import { VueFinalModal } from "vue-final-modal";
import DonationStep from "./steps/Donation.vue";
import BasketStep from "./steps/Basket.vue";
import DetailsStep from "./steps/Details.vue";
import Stripe from "./components/Stripe.vue";
import Paypal from "./components/Paypal.vue";
import ThankyouStep from "./steps/Thankyou.vue";
import ProgressStep from "./components/ProgressStep.vue";
import Footer from "./components/Footer.vue";
import Title from "./components/Title.vue";
import Total from "./components/Total.vue";
import Button from "./components/Button.vue";
import { XCircleIcon } from "@heroicons/vue/20/solid";

export default {
  name: "DonorCloud",
  components: {
    VueFinalModal,
    DonationStep,
    BasketStep,
    DetailsStep,
    Stripe,
    ThankyouStep,
    ProgressStep,
    Paypal,
    Footer,
    Title,
    Total,
    Button,
    XCircleIcon,
  },
  setup() {
    const donationForm = ref({ ...donation });
    const state = reactive({
      donor: { ...donor },
      donations: [],
    });
    const open = ref(false);
    const step = ref(1);
    const stepOneCompleted = () => {
      if (editIndex.value == null) {
        state.donations.push({ ...donationForm.value });
      } else {
        state.donations[editIndex.value] = { ...donationForm.value };
      }
      step.value = 2;
    };
    const stepTwoCompleted = () => {
      step.value = 3;
    };

    const editIndex = ref(null);
    const edit = (index) => {
      editIndex.value = index;
      donationForm.value = {
        ...state.donations[index],
      };
      step.value = 1;
    };

    const gatewayKeys = reactive({
      stripe: null,
      paypal: null,
    });
    const projects = ref([]);
    const admin_fee = ref(0);
    const getData = async () => {
      const { data } = await Api.fetchData();
      projects.value = data.projects;
      gatewayKeys.stripe = data.stripe_gateway;
      gatewayKeys.paypal = data.paypal_gateway;
      admin_fee.value = data.admin_fee;
    };

    const add = () => {
      editIndex.value = null;
      donationForm.value = {
        ...donation,
      };
      step.value = 1;
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
          amount: {
            oneOff: total_onetime.value,
            monthly: total_monthly.value,
          },
        };

        const { data } = await Api.stripePayment(payload);

        loading.value = false;
        step.value = 5;
      }
    };


    const paymentType = ref(null);
    const paymentTypeStep = (model) => {
      paymentType.value = model.value.payment_type;
      step.value = 4;
    };

    const monthlyDonations = computed(() => {
      return state.donations.filter((d) => d.monthly);
    });

    const oneTimeDonations = computed(() => {
      return state.donations.filter((d) => !d.monthly);
    });

    const total_onetime = computed(() => {
      return oneTimeDonations.value
        .map((d) => (d.fixed_amount ?? d.amount ?? 0) * d.qty)
        .reduce((a, b) => a + b, 0);
    });

    const total_monthly = computed(() => {
      return monthlyDonations.value
        .map((d) => (d.fixed_amount ?? d.amount ?? 0) * d.qty)
        .reduce((a, b) => a + b, 0);
    });

    const donate = async () => {
      if (saveDonation()) {
        makePayment();
      }
    };

    const saveDonation = async () => {
      const { data } = await Api.saveDonation(state);
      return data;
    };

    const handleClosed = () => {
      if (step.value == 5) {
        donationForm.value = { ...donation };
        state.donor = { ...donor };
        state.donations = [];
        step.value = 1;
      }
    };

    const loading = ref(false);

    onMounted(() => {
      getData();
    });
    return {
      donationForm,
      open,
      step,
      state,
      gatewayKeys,
      stepOneCompleted,
      stepTwoCompleted,
      edit,
      add,
      projects,
      donate,
      paymentTypeStep,
      paymentType,
      total_onetime,
      total_monthly,
      oneTimeDonations,
      monthlyDonations,
      handleClosed,
      loading,
      handleStripeDonation,
    };
  },
};
</script>
<template>
  <Button
    text="Donate"
    @click="open = true"
    class="fixed right-10 bottom-6"
    active
  />
  <VueFinalModal
    v-slot="{ close }"
    overlay-class=""
    classes="flex items-center justify-center px-5"
    content-class="w-full max-w-[1400px] h-[calc(100vh_-_20px)] overflow-hidden rounded-3xl"
    v-model="open"
    @closed="handleClosed"
  >
    <div class="flex flex-col bg-white relative h-full">
      <div
        @click="close"
        class="z-10 cursor-pointer absolute right-0 top-0 rounded-full opacity-80 text-gray-800 h-16 w-16"
      >
        <XCircleIcon />
      </div>
      <!-- overflow-auto max-h-[calc(100vh_-_128px)] -->
      <main
        class="relative flex flex-col flex-1 justify-between overflow-auto h-full mb-[8rem] no-scrollbar"
      >
        <div class="max-w-[900px] mx-auto px-4">
          <Title />
          <div class="flex items-center max-w-[700px] mx-auto my-4">
            <progress-step
              v-for="(s, i) in 3"
              :key="i"
              :step="s"
              :current="step"
            />
          </div>
          <div class="max-w-[750px] mx-auto py-5 mb-10">
            <DonationStep
              v-model="donationForm"
              :projects="projects"
              v-show="step == 1"
              @forward="stepOneCompleted"
            />
            <BasketStep
              v-model="state"
              v-show="step == 2"
              @forward="stepTwoCompleted"
              @edit="edit"
              @add-another="add"
              :admin_fee="admin_fee"
            />
            <DetailsStep
              v-model="state.donor"
              v-show="step == 3"
              :hasMonthly="monthlyDonations.length > 0"
              @backward="step = 2"
              @forward="paymentTypeStep"
            />
            <Stripe
              v-if="gatewayKeys.stripe"
              :customer="state.donor"
              :public-key="gatewayKeys.stripe"
              v-show="step == 4 && paymentType == 'credit'"
              @backward="step = 3"
              @forward="handleStripeDonation"
              :loading="loading"
              @start-loading="loading = true"
              @error="loading = false"
            />
            <Paypal
              :client-id="gatewayKeys.paypal"
              :loading="loading"
              :donations="oneTimeDonations"
              :projects="projects"
              v-if="
                gatewayKeys.paypal &&
                step == 4 &&
                paymentType == 'paypal' &&
                monthlyDonations.length == 0
              "
              @backward="step = 3"
              @forward="handlePaypal"
              @start-loading="loading = true"
              @error="loading = false"
            />
            <ThankyouStep v-if="step == 5" />

            <Total
              v-if="step < 5"
              :oneTime="total_onetime"
              :monthly="total_monthly"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  </VueFinalModal>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap");
</style>
