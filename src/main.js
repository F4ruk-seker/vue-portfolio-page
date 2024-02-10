import { createApp, config } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from "axios";
import AuthService from "@/composable/AuthService";
// import VueMeta from 'vue-meta'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import {createHead} from "@vueuse/head";
const head = createHead()
// import 'vue3-markdown/dist/style.css'


axios.defaults.baseURL = process.env.VUE_APP_API_PATH

const carrier_switch = 'Bearer'

axios.interceptors.request.use(
    ( config ) => {
        console.log('config')
        config.headers["Authorization"] = `${carrier_switch} ${AuthService.getAccessToken()}`;
        return config;
    });

axios.interceptors.response.use(
    (response) =>{
        return response
    }, error => {
        // console.error('Error in response:', error);
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return AuthService.refreshToken()
                .then((newAccessToken) => {
                    originalRequest.headers['Authorization'] = `${carrier_switch} ${newAccessToken}` ;
                    return axios(originalRequest);
                })
                .catch((refreshError) => {
                    AuthService.logout()
                    return Promise.reject(refreshError); // Reject the promise to propagate the error further

                })
        }
        return Promise.reject(error);
    }
)

config.head = {
    title: 'Vue.js Projem',
    meta: []
  };

createApp(App)
    .use(store)
    .use(router)
    .use(head)
    .mount('#app')

await router.isReady()
