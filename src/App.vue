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
import ThankyouStep from "./steps/Thankyou.vue";
import ProgressStep from "./components/ProgressStep.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Title from "./components/Title.vue";
import Total from "./components/Total.vue";


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
    Header,
    Footer,
    Title,
    Total,
  },
  setup() {
    const donationForm = ref({...donation});
    const state = reactive({
      donor: {...donor},
      donations: [],
    })
    const open = ref(true);
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
      const { data } = await Api.fetchAllProjects()
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
      projects
    };
  },
};
</script>
<template>
  <button @click="open = true">open</button>
  <VueFinalModal
    v-slot="{ close }"
    overlay-class=""
    classes="min-h-[calc(100%_-_60px)] py-10 overflow-auto "
    content-class="max-w-[1400px] min-h-full flex flex-col m-auto bg-white rounded-3xl overflow-hidden"
    v-model="open"
  >
    <Header/>

    <main  class="h-full flex flex-col flex-1 justify-between ">
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
          <DetailsStep v-model="state.donor"  v-if="step == 3"  @backward="step=2" @forward="step=4" />
          <Stripe :stripePublicKey="gatewayKey" v-if="step == 4" />
          <ThankyouStep v-if="step == 5" />
        </div>
      </div>

      <Total v-if="step<4" :state="state" />
    </main>

    <Footer />
  </VueFinalModal>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap");

</style>