<style >
@keyframes rotateDownAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes rotateUpAnimation {
  0% {
    transform: rotate(180deg);

    }
  100% {
    transform: rotate(360deg);

  }
}


.anim-ascend {
  animation: rotateDownAnimation 1s linear forwards;
  transform-origin: center; /* Dönüşün merkezi */
}

.anim-descend {
  animation: rotateUpAnimation 1s linear forwards;
  transform-origin: center; /* Dönüşün merkezi */
}

</style>
<template>
<section class="d-flex" style="height: 100vh;">
    <article class="container justify-content-center m-auto">
        <div class="w-100">
            <form class="d-flex" @submit.prevent="get_ip_flow">
                <input type="text" :class="'form-control w-100 rounded-end-0 border-end-0 fw-bold' + (on_load ? 'disabled': '')" v-model="ip" :disabled="on_load">
                <select class="form-control p-0 px-2 rounded-0 w-25" v-model="timely" @change="get_ip_flow" :disabled="on_load">
                    <option>hourly</option>
                    <option>daily</option>
                    <option>weekly</option>
                    <option>monthly</option>
                </select>
                <button class="btn btn-white border-top border-bottom d-flex rounded-0" @click="descend" :disabled="on_load">
                    <span :class="'justify-content-center m-auto ' + ( ascend ? 'anim-ascend':'anim-descend' )">
                        <i class="fa-regular fa-circle-up " style="font-size: 18px;"></i>
                    </span>
                    <!--span v-if="ascend" class="justify-content-center m-auto"><i class="fa-solid fa-sort-up"></i></span>
                    <span v-else class="justify-content-center m-auto"><i class="fa-solid fa-sort-down"></i></span-->
                </button>
                
                <button class="btn btn-primary rounded-start-0" type="submit" :disabled="on_load"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>

        </div>
        <hr>
        <div v-if="!on_load" class="border rounded p-1 overflow-y-auto" style="height: 60vh;">
            <ul class="d-flex list-unstyled overflow-y-auto" v-for="(fd,index) in flow_data" v-bind:key="index">
                <li style="width: 30px;"><i :class="fd.icon"></i></li>
                <li class="fw-bold text-primary">-{{ fd.id }}-</li>
                <li class="w-100">{{ fd.visit_time }}</li>
                <li class="w-100">{{ fd.action ? fd.action.type : 'N/A' }}</li>
                <li class="w-100 fw-bold">@{{ fd.action ? fd.action.title : 'N/A' }}</li>
                <li class="w-100 fw-bold"><i class="fa-regular fa-clock"></i>{{ fd.action ? fd.current_time : 'N/A' }}'sec</li>
            </ul>
        </div>
        <div class="d-flex" style="height: 60vh;" v-else>
            <div class="m-auto justify-content-center spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </article>
</section>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const ip = ref('')
const ascend = ref(true) 
const flow_data = ref([])

const on_load = ref(false)

const timely = ref('hourly')


function get_type_icon(type_name) {
    const types = [
        {
            name: 'Page',
            icon: 'fa-regular fa-file'
        },{
            name: 'Content',
            icon: 'fa-solid fa-quote-left'
        },{
            name: 'Game',
            icon: 'fa-solid fa-quote-left'
        }
    ]
    for (const element of types) {
        if (type_name.startsWith(element.name)) {
            return element.icon;
        }
    }
    return ''
}

async function get_ip_flow(){
    // analytical/ip/127.0.0.1?last=d&order=ascenddescend
    on_load.value = true
    if (ip.value){
        try {
            const response = await axios.get(`analytical/ip/${ip.value}?last=${timely.value[0]}&order=${ascend.value ? 'ascend' : 'dascend'}`)
            flow_data.value = response.data
            flow_data.value.forEach(page => {
                if (page.action.type){
                    page.icon = get_type_icon(page.action.type)
                } else {
                    page.icon = ''
                }
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    on_load.value = false
}


function descend() {
    ascend.value =! ascend.value
 //   get_ip_flow()
}

onMounted(()=>{
    if (route.query.ip){
        ip.value = route.query.ip
        get_ip_flow(route.query.ip)
    }
})

</script>