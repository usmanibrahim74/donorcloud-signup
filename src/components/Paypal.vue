<template>
  <div>
    <div ref="paypal"></div>
    <div class="flex items-center justify-center mt-8 gap-4">
          <Button @click="moveBack" text="Back" />
    </div>
  </div>
</template>
<script>

import Button from "./Button.vue";
export default {
  components: {
    Button
  },
  props:{
    donations: {
      type: Array,
      default:null
    },
    projects:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: 20.00,
        description: "leg lamp from that one movie",
        img: "./assets/lamp.jpg",
      },
      purchase_units:[],
      // totalAmount: null
    };
  },
  mounted() {
    this.makeDonationProduct()
    const link =
      "https://www.paypal.com/sdk/js?client-id=AQYuvSdIb53kUFXZOgLWx2Ec6LlLHYy_WAUSXq94gSjMoCC5I-tA93u1Dsy3bgZmLfwt_gyogUMIqPsi&disable-funding=credit,card";
    const script = document.createElement("script");
    script.src = link;
    script.addEventListener("load", this.setupPaypal);
    document.body.appendChild(script);
  },
  methods: {
    moveBack() {
      this.$emit("backward");
    },
    makeDonationProduct(){
      this.purchase_units = []
      this.donations.map((donation,index) => {
        this.purchase_units.push({
          reference_id: this.getReferenceId(donation.project_id,index),
          description: this.projectName(donation.project_id),
          amount: {
            currency_code: "USD",
            value: donation.fixed_amount ?? donation.amount ?? 0
          }
        })  
      })
      
    },
    getReferenceId(id,index){
      let reference = this.projects.find((p) => p.id == id);
      return index + '_' + reference.tenant_id;
    },
    projectName(id) {
      let project = this.projects.find((f) => {
        return f.id == id;
      });
      return project.title;
    },
    setupPaypal() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: this.purchase_units
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.$emit('forward', order)
            this.paidFor = true;
            console.log(order);

          },
          onError: (err) => {
              this.$emit('error', err)
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>