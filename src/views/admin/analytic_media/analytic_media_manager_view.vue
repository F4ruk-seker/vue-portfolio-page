<template>
<section class="border d-flex h-100 overflow-y-auto">
    <article class="w-50 p-2">
        <input 
            class="form-control bg-transparent fw-bold text-white" 
            type="text" 
            placeholder="'title', 'view__ip_address', 'media_source', 'slug', 'platform_host'"
            @input="load_data"
            v-model="search_text"
            >
        <div class="d-flex py-1">
            <p class="my-auto pe-2">count: {{ media_analytics.length }}</p>
            <hr class="bg-light w-100 my-auto" style="height: 4px;">
        </div>
        <table class="table table-dark table-striped opacity-75">
            <thead>
                <tr>
                    <th class="rounded-top rounded-end-0" scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Platform Host</th>
                    <th class="rounded-top rounded-start-0" scope="col">Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(media_analytic, index) in media_analytics" v-bind:key="index">
                    <td :style="index + 1 == media_analytics.length ? 'border-bottom-left-radius:var(--bs-border-radius) !important;':''">{{ index + 1 }}</td>                    
                    <td>{{ media_analytic.title.slice(0, 50) }}{{ media_analytic.title.length > 50 ? '...':'' }}</td>                    
                    <td>{{ media_analytic.platform_host }}</td>                    
                    <td :class="index + 1 == media_analytics.length ? 'rounded-bottom rounded-start-0':''">
                        <p 
                            class="p-0 m-0 fw-semibold link-info"
                            style="cursor: pointer;"
                            @click="selected_media_analytic=media_analytic">
                                show
                        </p>
                    </td>                    
                </tr>
            </tbody>
        </table>
    </article>
    <article class="w-50">
        <div v-if="selected_media_analytic" class="ps-0 p-2">
            <div class="d-flex">
                <div class="w-75">
                    <input class="form-control bg-transparent fw-semibold text-dark mb-3" type="text" placeholder="title" v-model="selected_media_analytic.title">
                    <input class="form-control bg-transparent fw-semibold text-dark mb-3" type="text" placeholder="slug" v-model="selected_media_analytic.slug">
                    <input 
                        :class="'form-control bg-transparent fw-semibold text-dark mb-3 ' + (redirect_input_text_is_valid ? '': 'border border-danger')" 
                        type="url" placeholder="redirect url" v-model="redirect_input_text">
                    <input class="form-control bg-transparent fw-semibold text-dark mb-3" type="text" placeholder="host" v-model="selected_media_analytic.platform_host">
                    <input class="form-control bg-transparent fw-semibold text-dark mb-3" type="text" placeholder="path" v-model="selected_media_analytic.platform_href">
                    <div class="d-flex">
                        <p class="m-0 p-0 pe-2" style="min-width: max-content;">Route : </p>
                        <hr class="w-100 bg-info">
                    </div>
                    <input class="form-control bg-transparent fw-semibold text-dark mb-3" type="text" placeholder="media_source" v-model="selected_media_analytic.media_source">
                </div>
                <div class="w-25 px-1 d-flex">
                    <div class="my-auto">
                        <img class="img img-fluid my-auto" :src="selected_media_analytic.media_source" alt="media preview">
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
            <hr class="w-100 bg-light">
            <table class="table table-dark table-striped opacity-75">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Ip Address</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(_view, index) in selected_media_analytic.view" v-bind:key="index">
                        <tr >
                        <td>{{ index + 1 }}</td>
                        <td>{{ _view.ip_data.Country }}</td>
                        <td>{{ _view.ip_data.City }}</td>
                        <td>{{ _view.ip_address }}</td>
                        <td 
                            style="cursor: pointer;"
                            @click="_view.expend=!_view.expend">{{ _view.expend ? 'Hide':'Show' }}</td>
                    </tr>
                    <tr >
                        <td colspan="5" style="height: 100vh;" v-show="_view.expend">
                            <table>
                                <tbody>
                                    
                                    <tr><th class="pe-1"><strong>Time :</strong></th><td>{{ _view.visit_time }}</td></tr>
                                    <tr><th class="pe-1"><strong>Country :</strong></th><td>{{ _view.ip_data.Country }}</td></tr>
                                    <tr><th class="pe-1"><strong>City :</strong></th><td>{{ _view.ip_data.City }}</td></tr>
                                    <tr><th class="pe-1"><strong>IP :</strong></th><td>{{ _view.ip_address }}</td></tr>
                                    <tr><th class="pe-1"><strong>RCIAH :</strong></th><td>{{ _view.reload_count_in_a_clock }}</td></tr>
                                    <tr><th class="pe-1"><strong>IAM :</strong></th><td>{{ _view.is_i_am }}</td></tr>
                                    <tr><th class="pe-1"><strong>User :</strong></th><td>{{ _view.user_agent }}</td></tr>
                                    <tr><th class="pe-1"><strong>HTTP Header:</strong></th><td>{{ _view.http_sec_ch_ua }}</td></tr>
                                    <tr><th class="pe-1"><strong>IP DATA:</strong></th><td>{{ _view.ip_data }}</td></tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </article>
</section>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';

const media_analytics = ref([])
const selected_media_analytic =  ref(null)

const redirect_input_text = ref('')
const redirect_input_text_is_valid = ref(true)

const search_text = ref('')

watch(selected_media_analytic, new_selected_media_analytic => {
    console.log(selected_media_analytic.value)
    selected_media_analytic.value.view.forEach(element => {
        element.expend= false
    });
})

watch(redirect_input_text, new_redirect_input_text => {
    if (URL.canParse(new_redirect_input_text)){
        const parsed = URL.parse(new_redirect_input_text)
        selected_media_analytic.value.platform_host = parsed.host
        selected_media_analytic.value.platform_href = parsed.href
        redirect_input_text_is_valid.value = true
    } else {
        redirect_input_text_is_valid.value = false
    }
}) 

async function load_data() {
    const response = await axios.get(`analytical/analytical-media?search=${search_text.value}`)
    if (response.status === 200) {media_analytics.value = response.data}
}

onMounted(async ()=>{
    await load_data ()
})
</script>