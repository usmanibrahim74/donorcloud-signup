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
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Title from "./components/Title.vue";
import Total from "./components/Total.vue";
import Button from "./components/Button.vue";


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
    Header,
    Footer,
    Title,
    Total,
    Button,
  },
  setup() {
    const donationForm = ref({...donation});
    const state = reactive({
      donor: {...donor},
      donations: [],
    })
    const open = ref(false);
    const step = ref(1);
    const stepOneCompleted = ()=>{
      if(editIndex.value == null){
        state.donations.push({...donationForm.value})
      }else{
        state.donations[editIndex.value] = { ...donationForm.value }
      }
      step.value=2;
    }
    const stepTwoCompleted = ()=>{
      
      step.value=3;
    }


    const editIndex = ref(null);
    const edit = (index) =>{
      editIndex.value = index;
      donationForm.value = {
        ...state.donations[index]
      }
      step.value = 1;
    }

    const projects = ref([]);
    const fetchProjects = async () => {
      const { data } = await Api.fetchProjects()
      projects.value = data.data
    }

    const gatewayKey = ref(null);
    const fetchGatewayKey = async () => {
      let gateWay = 'stripe';
      const { data } = await Api.fetchGatewayKey(gateWay)
      gatewayKey.value = data.data.public_key
    }

    const add = () =>{
      editIndex.value = null;
      donationForm.value = {
        ...donation
      }
      step.value = 1;
    }

    const makePayment = async (token)=>{
      await Api.makePayment(token);
    }

    const paymentType = ref(null);
    const paymentTypeStep = (model) => {
      paymentType.value = model.value.payment_type
      step.value = 4
    }

    const hasMonthly = computed(() => {
      return state.donations.some((d) => d.monthly);
    });

    const monthlyDonations = computed(()=> {
      return state.donations
        .filter((d) => d.monthly)
    })

    const oneTimeDonations = computed(()=> {
      return state.donations
        .filter((d) => !d.monthly)
    })

    const total_onetime = computed(() => {
      return oneTimeDonations.value
        .map((d) => (d.fixed_amount ?? d.amount ?? 0) * d.qty)
        .reduce((a,b) => a+b,0)
    });
    
    const total_monthly = computed(() => {
      return monthlyDonations.value
        .map((d) => (d.fixed_amount ?? d.amount ?? 0) * d.qty)
        .reduce((a,b) => a+b,0)
    });

    const donate = async ()=>{
      if(makePayment()){
        saveDonation()
      }
    }

    const saveDonation = async ()=>{
        await Api.saveDonation(state);
        step.value = 5;
    }

    const handleClosed = () => {
      if(step.value == 5){
        donationForm.value = {...donation};
        state.donor = {...donor};
        state.donations = [];
        step.value = 1
      }
    }

    onMounted(()=>{
      fetchProjects();
      fetchGatewayKey();
    })
    return {
      donationForm,
      open,
      step,
      state,
      gatewayKey,
      stepOneCompleted,
      stepTwoCompleted,
      edit,
      add,
      projects,
      donate,
      paymentTypeStep,
      paymentType,
      hasMonthly,
      total_onetime,
      total_monthly,
      oneTimeDonations,
      monthlyDonations,
      handleClosed
    };
  },
};
</script>
<template>
  <Button text="Donate" @click="open=true" class="fixed right-10 bottom-6" active />
  <VueFinalModal
    v-slot="{ close }"
    overlay-class=""
    classes="min-h-[calc(100%_-_60px)] py-10 overflow-auto "
    content-class="max-w-[1400px] min-h-full flex flex-col m-auto bg-white rounded-3xl overflow-hidden"
    v-model="open"
    @closed="handleClosed"
  >
    <Header @close="close" />

    <main  class="relative h-full flex flex-col flex-1 justify-between ">
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
          <DonationStep v-model="donationForm" :projects="projects" v-if="step == 1" @forward.once="stepOneCompleted" />
          <BasketStep v-model="state" v-if="step == 2" @forward="stepTwoCompleted" @edit="edit" @add-another="add" />
          <DetailsStep v-model="state.donor" v-if="step == 3" :hasMonthly="hasMonthly" @backward="step=2" @forward="paymentTypeStep" />
          <div v-if="step == 4">
            <Stripe :customer="state.donor" :stripePublicKey="gatewayKey" v-if="gatewayKey && paymentType == 'credit'" v-show="step == 4" @backward="step=3"  @forward="donate" />
            <Paypal v-if="paymentType == 'paypal' && !hasMonthly" :donations="oneTimeDonations" :projects="projects" v-show="step == 4" @backward="step=3" @forward="donate"/>
          </div>
          <ThankyouStep v-if="step == 5" />
        </div>
      </div>

      <Total v-if="step<5" :oneTime="total_onetime" :monthly="total_monthly" />
    </main>

    <Footer />
  </VueFinalModal>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap");

</style>