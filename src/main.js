import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./setup.js";
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const app = createApp(App)
.component("v-select", VueSelect);
app.mount("#synergi-donorcloud-app");