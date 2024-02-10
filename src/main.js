import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from "axios";
import AuthService from "@/composable/AuthService";
// import VueMeta from 'vue-meta'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
//import {createHead} from "@vueuse/head";
//const head = createHead()
import { createMetaManager } from 'vue-meta';

// import 'vue3-markdown/dist/style.css'


axios.defaults.baseURL = process.env.VUE_APP_API_PATH

const carrier_switch = 'Bearer'

axios.interceptors.request.use(
    ( config ) => {
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

let app;
app = createApp(App)
app.use(store)
app.use(router)
//app.use(head)
const metaManager = createMetaManager(app);

app.use(metaManager)

await router.isReady()
app.mount('#app')
