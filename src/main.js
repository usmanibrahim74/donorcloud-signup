import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "https://js.stripe.com/v3/";
import VueSidePanel from 'vue3-side-panel';
import 'vue3-side-panel/dist/vue3-side-panel.css'
const app = createApp(App);

app.use(VueSidePanel);
app.mount('#custom_popup')
