<template>
  <div>
    <form>
      <div>
        <p
          class="stripe__error mb-3 text-red-400 text-xs m-0"
          v-if="stripeError"
        >
          {{ stripeError }}
        </p>
      </div>
      <div class="stripe mb-3">
        <div>
          <div
            id="card-number"
            class="block w-full rounded-3xl border-2 px-6 py-4 font-normal text-gray-700 bg-primary-100 border-primary transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green focus:outline-none StripeElement StripeElement--empty"
          ></div>
          <span
            class="stripe__error ml-5 text-red-400 text-xs"
            v-if="cardNumberError"
          >
            {{ cardNumberError }}
          </span>
        </div>
      </div>

      <div class="stripe__box">
        <div class="stripe__box__cvv mb-3">
          <div>
            <div
              id="card-cvc"
              class="block w-full rounded-3xl border-2 px-6 py-4 font-normal text-gray-700 bg-primary-100 border-primary transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green focus:outline-none StripeElement StripeElement--empty"
            ></div>
            <span
              class="stripe__error ml-5 text-red-400 text-xs"
              v-if="cardCvcError"
            >
              {{ cardCvcError }}
            </span>
          </div>
        </div>
        <div class="stripe__box__expiry">
          <div>
            <div
              id="card-expiry"
              class="block w-full rounded-3xl border-2 px-6 py-4 font-normal text-gray-700 bg-primary-100 border-primary transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green focus:outline-none StripeElement StripeElement--empty"
            ></div>
            <span
              class="stripe__error ml-5 text-red-400 text-xs"
              v-if="cardExpiryError"
            >
              {{ cardExpiryError }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center mt-8 gap-4">
        <Button @click="moveBack" text="Back" />
        <Button @click.prevent="submitFormToCreateToken" active text="Donate" />
      </div>
    </form>
  </div>
</template>
<script>
import Button from './Button.vue';

export default {
  props: ["amount","customer","stripePublicKey"],
  components:{
    Button
  },
  data() {
    return {
      card: {
        cvc: "",
        number: "",
        expiry: "",
      },

      //elements
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      stripe: null,

      // errors
      stripeError: "",
      cardCvcError: "",
      cardExpiryError: "",
      cardNumberError: "",
      error: false,

      loading: false,
      url: import.meta.env.VITE_WEB_URL,
      token: null,
    };
  },

  mounted() {
    this.setUpStripe();
  },

  methods: {
    moveBack() {
      this.$emit('backward')
    },
    setUpStripe() {
      const stripe = Stripe(this.stripePublicKey);
      this.stripe = stripe;

      const elements = stripe.elements();
      this.cardCvc = elements.create("cardCvc");
      this.cardExpiry = elements.create("cardExpiry");
      this.cardNumber = elements.create("cardNumber");

      this.cardCvc.mount("#card-cvc");
      this.cardExpiry.mount("#card-expiry");
      this.cardNumber.mount("#card-number");

      this.listenForErrors();
    },

    listenForErrors() {
      const vm = this;

      this.cardNumber.addEventListener("change", (event) => {
        vm.toggleError(event);
        vm.cardNumberError = "";
        vm.card.number = event.complete ? true : false;
      });

      this.cardExpiry.addEventListener("change", (event) => {
        vm.toggleError(event);
        vm.cardExpiryError = "";
        vm.card.expiry = event.complete ? true : false;
      });

      this.cardCvc.addEventListener("change", (event) => {
        vm.toggleError(event);
        vm.cardCvcError = "";
        vm.card.cvc = event.complete ? true : false;
      });
    },

    toggleError(event) {
      if (event.error) {
        this.stripeError = event.error.message;
        this.error = true
      } else {
        this.stripeError = "";
      }
    },

    validate(){
      this.clearCardErrors();
      if (!this.card.number) {
        this.cardNumberError = "Card Number is Required";
        return false;
      }
      if (!this.card.cvc) {
        this.cardCvcError = "CVC is Required";
        return false;
      }
      if (!this.card.expiry) {
        this.cardExpiryError = "Month is Required";
        return false;
      }
      if (this.stripeError) {
        return false;
      }
      return true;
    },
    submit(){
      if(this.validate() && this.createToken()){
        this.$emit("forward", token);
      }
    },


    createToken() {
      this.loading = true
      this.stripe.createToken(this.cardNumber,
      {
        name: this.customer.email,
        address_line1: this.customer.address_line_1,
        address_city: this.customer.city,
        address_country: this.customer.country
       }).then(async (result) => {
        if (result.error) {
          this.stripeError = result.error.message;
          return false;
        } else {
          this.token = result.token.id;
          return true
        }
      });
    },

    clearElementsInputs() {
      this.cardCvc.clear();
      this.cardExpiry.clear();
      this.cardNumber.clear();
    },

    clearCardErrors() {
      this.stripeError = "";
      this.cardCvcError = "";
      this.cardExpiryError = "";
      this.cardNumberError = "";
    },
  },
};
</script>
