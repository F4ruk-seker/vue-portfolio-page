import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from "axios";
import AuthService from "@/composable/AuthService";
import Notifications from '@kyvg/vue3-notification'

import heatmap from 'vue-heatmapjs'
import { Subject } from 'rxjs';

const stream = new Subject();
// import VueMeta from 'vue-meta'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import '@/assets/css/bootstrap.css'
import '@/assets/css/style.css'
import {JsonEditorPlugin} from 'vue3-ts-jsoneditor';


import {createHead} from "@vueuse/head";
const head = createHead()
import { createMetaManager } from 'vue-meta';

// import 'vue3-markdown/dist/style.css'


axios.defaults.baseURL = process.env.VUE_APP_API_PATH

const carrier_switch = 'Bearer'

axios.interceptors.request.use(
    ( config ) => {
        // config.cookie
        config.headers["Authorization"] = `${carrier_switch} ${AuthService.getAccessToken()}`;
        return config;
    });

axios.interceptors.response.use(
    (response) =>{
        return response
    }, async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && originalRequest._retry) {
            originalRequest._retry = true;
            const refresh = await AuthService.refreshToken()
            originalRequest.headers['Authorization'] = `${carrier_switch} ${refresh}` ;
            console.log(refresh)
            return axios(originalRequest);
            
        }
        if (error.response.status === 401){
            originalRequest._retry = false;
            AuthService.logout()
            router.push({name:'login'})
        }
        return Promise.reject(error);
    }
)



let app;
app = createApp(App)
app.use(store)
app.use(router)
app.use(head)
app.use(heatmap, {
    stream,
  })
app.use(Notifications)

const metaManager = createMetaManager(app);

app.use(metaManager)
app.use(JsonEditorPlugin)
router.isReady()
app.mount('#app')

stream.subscribe(console.log);
