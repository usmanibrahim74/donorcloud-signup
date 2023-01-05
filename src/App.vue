<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import Api from "./services/api";
import countries from "./data/countries.json";
import Basket from "./components/Basket.vue";
import DonationModal from "./components/DonationModal.vue";
import Footer from "./components/Footer.vue";
import Stripe from "./components/Stripe.vue";
import IconDelete from "./components/icons/IconDelete.vue";
import IconEdit from "./components/icons/IconEdit.vue";
import IconCheck from "./components/icons/IconCheck.vue";
import Paypal from "./components/Paypal.vue";

import { current_donation, form } from "./data/resets";
let state = reactive({
  showModal: false,
  isCartOpened: false,
  isAddDonationOpened: false,
  step: 1,
  selectedItem: null,
  errors: {},
  projects: [],
  locations: [],
  donationTypes: [],
  donations: [],
  countries,
  totalAmount: 0,
  current_donation: { ...current_donation },
  form: { ...form },
  stripePublicKey: 'pk_test_51KEZblITpRY73U53TSXaNrW8Uj4zeIFKDFogBqAHeBFrqmtPgflNm5PY0gdbRStebJZnTvqe5GJhaZciHti7t20M00BMb5ZjIB',
  totalDonation: 0, 
  donationTotal:0,
  adminProjects:[],
  quickDonation:{}
});
const donationComponentRef = ref(null)
onMounted(() => {
  // getPublicKey();
  // getProjects();
  getAdminProjects()
  bindSelectorClick();
  bindProjectSelectorClick();
});

async function getAdminProjects() {
  let { data } = await Api.fetchAdminProjects();
  state.adminProjects = data
}


function bindSelectorClick() {
  if (document.getElementById("donationModal")) {
    let selector = document
      .getElementById("donationModal")
      .getAttribute("data-selector");
    let shoBasketButton = document.querySelector("#btn-show-basket");
    if (shoBasketButton != null) {
      shoBasketButton.addEventListener("click", () => {
        openModel();
      });
    }

    let showDonationButton = document.querySelector("#btn-show-donation-modal");
    if (showDonationButton != null) {
      showDonationButton.addEventListener("click", () => {
        openDonationModal();
      });
    }
  }
}
function bindProjectSelectorClick() {
  if (document.getElementById("donationModal")) {
    let btnAddToCart = document.querySelector(".btn-add-project-to-cart");
    if (btnAddToCart != null) {
      btnAddToCart.addEventListener("click", (e) => {
        let category_id = e.target.getAttribute('data-category-id')
        let project_id = e.target.getAttribute('data-project-id')

        state.quickDonation = {
          category_id: category_id,
          project_id:project_id
        }
        
        donationComponentRef.value.quickDonate(state.quickDonation)

        state.isAddDonationOpened = true
      });
    }
  }
}

const hasMonthly = computed(() => {
  return state.donations.some((d) => d.monthly);
});


function addDonation() {
  if (validateDonation()) {
    if (state.selectedItem == null) {
      state.donations = [...state.donations, { ...state.current_donation }];
    } else {
      state.donations[state.selectedItem] = state.current_donation;
      state.selectedItem = null;
    }
    state.current_donation = { ...current_donation };
    state.errors = {};
    stepForward();
  }
}

function stepForward() {
  state.step++;
}

function removeItem(index) {
  state.donations.splice(index, 1);
}

function editItem(index) {
  state.selectedItem = index;
  state.current_donation = state.donations[index];
  state.step = 1;
}

// async function storeDonation() {
//   if (validateDonation()) {
//     let form = state.form;
//     form.donations = state.donations;
//     form.donations.map((f) => {
//       state.totalAmount += f.amount * f.qty;
//       f.totalAmount = f.amount * f.qty;
//       return (f.amount = f.amount * f.qty);
//     });
//     state.form = form;

//     stepForward();
//   }
// }

// async function stripePayment(token) {
//   state.form.donations = state.donations
//   let { data } = await Api.saveDonation(state.form);
//   if (data.success == true) {
//     let payment = {};
//     payment.token = token;
//     payment.name = state.form.first_name;
//     payment.email = state.form.email;
//     payment.amount = { monthly: 0, single: 0 };
//     payment.donor = data.donor;
//     payment.monthly_donations = data.monthly_donations;
//     state.donations.map((f) => {
//       if (f.monthly) {
//         payment.amount.monthly += f.amount;
//       }
//       if (!f.monthly) {
//         payment.amount.single += f.amount;
//       }
//     });
//     let pay = await Api.makePayment(payment);
//     if (pay.data.success) {
//       initAgain();
//       showSuccessPage();
//     }
//   }
// }

// async function PaypalPaymentSuccess(response) {
//   state.form.donations = state.donations
//   let { data } = await Api.saveDonation(state.form);

//   initAgain();
//   showSuccessPage();
// }

function initAgain() {
  state.donations = [];
}

function showSuccessPage() {
  // state.firstPage = true
}

function onlyNumber($event) {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    $event.preventDefault();
  }
}

async function getPublicKey() {
  const { data } = await Api.fetchGatewayKey("stripe");
  state.stripePublicKey = data?.data?.public_key;
}
function openModel() {
  state.isCartOpened = true
}
function openDonationModal() {
  state.isAddDonationOpened = true
}

function assets(asset) {
  return Api.assets(asset);
}

function donationAdded(donation) {
  if (state.selectedItem == null) {
    state.donations = [...state.donations, { ...donation }];
  } else {
    state.donations[state.selectedItem] = state.current_donation;
    state.selectedItem = null;
  } 
}

function toggleCustomProject(type, selected) {
  console.log(type,selected)
  if (type == "admin_fee") { 
    state.form.admin_fee_cover = selected
    // console.log(type, selected, state.form.admin_fee_cover)
    
  } else {
    state.form.paper_copy = selected
    // console.log(type,selected,state.form.paper_copy)
  }
}

function updateMiniCart(amount) {
  console.log(amount)
  let minicart = document.getElementById("synergy-mini-cart-label");
  // console.log(minicart)
  minicart.innerText = amount
}
</script>
  
<template>
  <div>
    <VueSidePanel v-model="state.isCartOpened" lock-scroll class="md:w-1/3 w-full bg-gray-100">
      <Basket :donations="state.donations" 
            :form="state.form" 
            :stripePublicKey="state.stripePublicKey"
            @toggleCustomProject="toggleCustomProject" 
            @initAgain="initAgain"
            @totalAmount="updateMiniCart"
            @removeItem="removeItem"/>
    </VueSidePanel>
    <VueSidePanel v-model="state.isAddDonationOpened" lock-scroll class="md:w-1/3 w-full bg-gray-100">
      <DonationModal 
      ref="donationComponentRef"
      @added="donationAdded"/>
    </VueSidePanel>
  </div>
</template>