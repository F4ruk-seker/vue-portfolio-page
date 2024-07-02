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
import { createMetaManager } from 'vue-meta';

const head = createHead()

// import 'vue3-markdown/dist/style.css'


axios.defaults.baseURL = process.env.VUE_APP_API_PATH

const carrier_switch = 'Bearer'

axios.interceptors.request.use(
    ( config ) => {
        config.headers["Authorization"] = `${carrier_switch} ${AuthService.getAccessToken()}`;
        return config;
    });

axios.interceptors.response.use(
    (response) => {
        return response
    }, async error => {
        if (error.response.status === 401 && !error.config.url.endsWith('/refresh/')) {
            try {
                const refresh = await AuthService.refreshToken()
                error.config.headers['Authorization'] = `${carrier_switch} ${refresh}` ;
                return axios(error.config);
            } catch (e) {
                console.error(e)
                //AuthService.logout()
                //router.push({name:'login'})
            }

        } else if (error.response.status === 401 && error.config.url.endsWith('/refresh/')) {
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
/*
import VueApexCharts from 'vue-apexcharts'
app.use(VueApexCharts)
*/


const metaManager = createMetaManager(app);

app.use(metaManager)
app.use(JsonEditorPlugin)
router.isReady()
app.mount('#app')

stream.subscribe(console.log);
