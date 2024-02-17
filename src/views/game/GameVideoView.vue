<template>
<section class="d-flex bg-dark text-light" style="height: 100vh;">
    <article class="container justify-content-center m-auto border border-ligh rounded-2">
    <div v-if="game" class="row">
        <div class="col-12 col-md-8">
            <div class="ratio ratio-16x9">
                <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen :src="game.video.url">
                </iframe>
            </div>
            <div>
            <strong>{{ game.title }}</strong>
        </div>
        </div>
        <div class="col-12 col-md-4 row">
            <a class="col-6 col-md-12 d-flex text-decoration-none text-light my-auto" :href="game.music.url">
                <div class="ratio ratio-1x1 w-25 h-25">
                    <img :src="game.music.image" style="object-fit: cover;" alt="">
                </div>
                <div class="ms-2 my-auto">
                    {{ game.music.title }}
                    <hr class="p-1 m-1">
                    {{ game.music.description }}
                </div>
            </a>
            <div class="col-6 col-md-12"> 
                {{ game.game.name }}
            </div>
        </div>
    </div>
    <div v-else class="text-light">
        loads
    </div>
    </article>
</section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GameVideoView',
    props: ['slug'],
    data: ()=>{return{
        game: null
    }},
    methods: {
        async fetch_video(){
            await axios.get('game/' + this.slug).then((response)=>{
                this.game = response.data
            })
        }
    },
    mounted(){
        this.fetch_video()
    }
}
</script>