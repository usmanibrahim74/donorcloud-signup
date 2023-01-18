<template>
  <div>
    <Loader v-if="loading"  message="Please Wait..." />
    <form>
      <div class="stripe mb-3">
        <div>
          <div
            id="card-number"
            class="block w-full rounded-3xl border-2 px-6 py-4 font-normal transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green focus:outline-none StripeElement StripeElement--empty"
            :class="[
              errors.includes('number')
                ? 'text-red-700 bg-red-100 border-red-700'
                : 'text-gray-700 bg-primary-100 border-primary',
            ]"
          ></div>
          <HasError
            class="stripe__error ml-5"
            :message="messages.number.replace(':field', fields.number)"
            v-if="errors.includes('number')"
          />
        </div>
      </div>

      <div class="stripe__box">
        <div class="stripe__box__cvv mb-3">
          <div>
            <div
              id="card-cvc"
              class="block w-full rounded-3xl border-2 px-6 py-4 font-normal transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green focus:outline-none StripeElement StripeElement--empty"
              :class="[
                errors.includes('cvc')
                  ? 'text-red-700 bg-red-100 border-red-700'
                  : 'text-gray-700 bg-primary-100 border-primary',
              ]"
            ></div>
            <HasError
              class="stripe__error ml-5"
              :message="messages.cvc.replace(':field', fields.cvc)"
              v-if="errors.includes('cvc')"
            />
          </div>
        </div>
        <div class="stripe__box__expiry">
          <div>
            <div
              id="card-expiry"
              class="block w-full rounded-3xl border-2 px-6 py-4 font-normal transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green focus:outline-none StripeElement StripeElement--empty"
              :class="[
                errors.includes('expiry')
                  ? 'text-red-700 bg-red-100 border-red-700'
                  : 'text-gray-700 bg-primary-100 border-primary',
              ]"
            ></div>
            <HasError
              class="stripe__error ml-5"
              :message="messages.expiry.replace(':field', fields.expiry)"
              v-if="errors.includes('expiry')"
            />
          </div>
        </div>
        <div>
          <HasError
            class="stripe__error ml-5"
            :message="messages.stripe"
            v-if="messages.stripe != ''"
          />
        </div>
      </div>

      <div class="flex items-center justify-center mt-8 gap-4">
        <Button @click="moveBack" text="Back" />
        <Button @click.prevent="submit" active text="Donate" />
      </div>
    </form>
  </div>
</template>
<script>
import Button from "./Button.vue";
import HasError from "./HasError.vue";
import Loader from "./Loader.vue";

export default {
  props: ["amount", "customer", "stripePublicKey"],
  components: {
    Button,
    HasError,
    Loader,
  },
  data() {
    return {
      card: {
        number: false,
        cvc: false,
        expiry: false,
      },

      //elements
      elements: {
        number: "",
        cvc: "",
        expiry: "",
      },
      stripe: null,

      // errors
      messages: {
        stripe: "",
        number: "The :field field is required",
        cvc: "The :field field is required",
        expiry: "The :field field is required",
      },

      fields: {
        stripe: "",
        number: "card number",
        cvc: "cvc",
        expiry: "expiry date",
      },
      errors: [],

      loading: false,
      url: import.meta.env.VITE_WEB_URL,
    };
  },

  mounted() {
    this.setUpStripe();
  },
  computed: {},

  methods: {
    moveBack() {
      this.$emit("backward");
    },
    setUpStripe() {
      const stripe = Stripe(this.stripePublicKey);
      this.stripe = stripe;

      const elements = stripe.elements();
      this.elements = {
        number: elements.create("cardNumber"),
        cvc: elements.create("cardCvc"),
        expiry: elements.create("cardExpiry"),
      };
      this.elements.number.mount("#card-number");
      this.elements.cvc.mount("#card-cvc");
      this.elements.expiry.mount("#card-expiry");
      this.listenForErrors();
    },

    listenForErrors() {
      // this.validate();
      Object.keys(this.elements).forEach((key) => {
        this.elements[key].addEventListener("change", (event) => {
          this.card[key] = event.complete ? true : false;
          this.errors = this.errors.filter((e) => e != key);
          let message = "The :field field is required";
          if (event.error) {
            message = event.error.message;
            this.errors.push(key);
          }
          this.messages[key] = message;
        });
      });
    },

    validate() {
      this.errors = Object.keys(this.card).filter((r) => !this.card[r]);
      return !this.errors.length;
    },

    submit() {
      if (this.validate()) {
        this.loading = true;
        this.stripe
          .createToken(this.elements.number, {
            name: this.customer.email,
            address_line1: this.customer.address_line_1,
            address_city: this.customer.city,
            address_country: this.customer.country,
          })
          .then(async (result) => {
            if (result.error) {
              this.messages.stripe = result.error.message;
            } else {
              this.$emit("forward", result.token.id);
            }
          });
      }
    },
  },
};
</script>
