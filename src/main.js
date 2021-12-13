import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import App from './App.vue'
import router from './router'
import "../src/assets/reset.css"
// importing AOS
import AOS from 'aos'
import 'aos/dist/aos.css'
createApp(App).use(router,AOS.init()).mount('#app')
