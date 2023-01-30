import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "https://js.stripe.com/v3/";
import "./setup.js"

const app = createApp(App);
app.mount('#synergi-donorcloud-app')
