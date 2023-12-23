import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

axios.defaults.baseURL = process.env.VUE_APP_API_PATH


createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

