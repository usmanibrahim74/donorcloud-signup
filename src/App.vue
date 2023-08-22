<script>
import { reactive, ref, computed } from "@vue/reactivity";
import Api from "./services/api";

import ProgressStep from "./components/ProgressStep.vue";
import Title from "./components/Title.vue";
import LoginDetails from "./steps/LoginDetails.vue";
import Verification from "./steps/Verification.vue";
import CharityInformation from "./steps/CharityInformation.vue";
import Finish from "./steps/Finish.vue";
import Form from "./services/vform";

export default {
  name: "DonorCloud",
  components: {
    ProgressStep,
    Title,
    LoginDetails,
    Verification,
    CharityInformation,
    Finish,
  },
  computed: {},
  mounted() {},
  setup(props) {

    const state = reactive({
      step: 1,
      already_created: false,
      verified: "",
    });
    const login_form = reactive(
      new Form({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        agreed: 0,
      })
    );
    
    const saveLogin = async () => {
      const { data } = await login_form.post("save-login");

      if (data.status == "COMPLETED") {
        state.already_created = true;
      } else if(state.verified == login_form.email){
        state.step = 3;
      } else {
        state.step = 2;
      }
    };

    const verification_form = reactive(
      new Form({
        code: "",
        email: "",
      })
    );
    const verify = async () => {
      verification_form.email = login_form.email;
      const { data } = await verification_form.post("verify");
      if (data.status == "VERIFIED") {
        state.verified = verification_form.email;
        state.step = 3;
      }
    };

    const charity_form = reactive(
      new Form({
        charity: "",
        authorized: 0,
        email: "",
        portal_address: "",
      })
    );
    const complete = async () => {
      charity_form.email = login_form.email;
      const { data } = await charity_form.post("save-charity");
      if (data.status == "REGISTRATION_COMPLETED") {
        state.step = 4;
      }
    };
    const computedProps = {};

    return {
      state,
      ...computedProps,
      login_form,
      saveLogin,
      verification_form,
      verify,
      charity_form,
      complete
    };
  },
};
</script>
<template>
  <div id="donorcloud-signup">
    <main class="relative flex flex-col gap-5 overflow-auto no-scrollbar py-8">
      <Title class="max-w-lg mx-auto" />
      <div class="flex justify-center max-w-2xl w-full mx-auto mt-6">
        <progress-step
          v-for="(s, i) in 3"
          :key="i"
          :step="s"
          :current="state.step"
        />
      </div>
      <div class="max-w-lg w-full mx-auto px-4 py-4">
        <LoginDetails
          v-if="state.step == 1"
          v-model="login_form"
          @submit.prevent="saveLogin"
          :already-created="state.already_created"
        />
        <Verification v-model="verification_form" @submit.prevent="verify" v-if="state.step == 2" @back="state.step=1" />
        <CharityInformation v-model="charity_form" @submit.prevent="complete" v-if="state.step == 3" @back="state.step=1" />
        <Finish v-if="state.step == 4" />
      </div>
    </main>
  </div>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap");
</style>
