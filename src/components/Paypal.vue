<template>
  <div>
    <Loader v-if="loading" class="z-20" message="Please Wait..." />
    <div class="relative z-10" ref="paypal"></div>
    <div class="flex items-center justify-center mt-8 gap-4">
      <Button @click="$emit('backward')" text="Back" />
    </div>
  </div>
</template>
<script>
import Button from "./Button.vue";
import Loader from "./Loader.vue";
import { useCurrency } from "@/use/useCurrency";
import { ref, reactive } from "@vue/reactivity";
import { onMounted } from "vue";
export default {
  components: {
    Button,
    Loader,
  },
  props: {
    donations: {
      type: Array,
      default: null,
    },
    projects: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    clientId: {
      type: String,
      default: null,
    },
  },
  setup(props, { emit }) {
    const { currency_code } = useCurrency();

    const getReferenceId = (id, index) => {
      const reference = props.projects.find((p) => p.id == id);
      return index + "_" + reference.tenant_id;
    };
    const projectName = (id) => {
      const project = props.projects.find((f) => {
        return f.id == id;
      });
      return project.title;
    };

    const makeDonationProduct = () => {
      purchase_units.value = [];
      props.donations.map((donation, index) => {
        purchase_units.value.push({
          reference_id: getReferenceId(donation.project_id, index),
          description: projectName(donation.project_id),
          amount: {
            currency_code,
            value: donation.fixed_amount ?? donation.amount ?? 0,
          },
        });
      });
    };

    const addPaypalScript = () => {
      const link = `https://www.paypal.com/sdk/js?client-id=${props.clientId}&disable-funding=credit,card&currency=${currency_code}`;
      const script = document.createElement("script");
      script.src = link;
      script.addEventListener("load", setupPaypal);
      document.body.appendChild(script);
    };

    const paypal = ref(null);

    const purchase_units = ref([]);
    const setupPaypal = () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            emit("startLoading");
            return actions.order.create({
              purchase_units: purchase_units.value,
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            emit("forward", order);
          },
          onError: (err) => {
            emit("error", err);
            console.error(err);
          },
        })
        .render(paypal.value);
    };

    onMounted(() => {
      makeDonationProduct();
      addPaypalScript();
    });
    return {
      paypal,
    };
  },
};
</script>
