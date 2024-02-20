<template>

<section class="d-flex bg-dark" style="height: 100vh">
    <article class="container justify-content-center m-auto">
        <p class="mt-4">
            Game Videos
        </p>
        <hr>
        <div class="row">
            <div class="col-4" v-for="game in games" v-bind:key="game.id" @click="go_game_video(game.slug)">
                <div class="p-1 border rounded">
                    <div class="ratio ratio-1x1">
                        <img :src="game.seo_image_url" style="object-fit: cover;" alt="">
                    </div>
                    <h2 class="fw-bold text-primary">{{game.title}}</h2>
                </div>
            </div>
        </div>
    </article>
</section>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const router = useRouter()
const store = useStore()
const games = ref([])

async function fetch_games() {
    store.dispatch('showProgress')
    store.dispatch('updateProgressStatus', 60)
    await axios.get('game/').then((response)=>{
        games.value = response.data
    })
    store.dispatch('updateProgressStatus', 100)
    await new Promise(resolve => setTimeout(resolve, 100));
    store.dispatch('hideProgress')

}

function go_game_video(slug) {
    router.push({
        name:'game-video',
        params: {slug:slug}
    })
}

onMounted(fetch_games)

</script>