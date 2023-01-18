import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import mixin from "./mixin";
import "https://js.stripe.com/v3/";
import "./setup.js"

const app = createApp(App);
app.mixin(mixin);
app.mount('#synergi-donorcloud-app')
