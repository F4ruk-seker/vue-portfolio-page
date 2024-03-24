
<script>
import axios from 'axios';


export default {
    name: 'GameVideoView',
    props: ['slug'],
    data: ()=>{
        let context = {
            game: 'game',
            song: 'song',
            comments: 'comments',
            views: 'views',
            description: 'description',
            comment: 'comment'
        };
        if (window.navigator.language === 'tr-TR') {
            context = {
            game: 'oyun',
            song: 'şarkı',
            comments: 'yorumlar',
            comment: 'Yorum',
            views: 'izlenme',
            description: 'açıklama'
            };
        }
        return{
        game: null,
        context: context
    }},
    methods: {
        async fetch_video(){
            this.$store.dispatch('showProgress')
            this.$store.dispatch('updateProgressStatus', 40)
            await axios.get('game/' + this.slug).then((response)=>{
                this.game = response.data
            })
            this.$store.dispatch('updateProgressStatus', 60)
            await new Promise(resolve => setTimeout(resolve, 250));
            this.$store.dispatch('updateProgressStatus', 150)
            await new Promise(resolve => setTimeout(resolve, 100));
            this.$store.dispatch('hideProgress')
        }
    },
    mounted(){
        this.fetch_video()
    }
}
</script>
<template>
<section class="d-flex text-light" style="height: 100vh;">
    <article class="w-100 justify-content-center border-ligh rounded-2">
    <div v-if="game" class="row m-0 p-0">
        <div class="col-12 col-md-9 ">
            <div class="ratio ratio-16x9 ">
                <iframe class="rounded-bottom-2 rounded-start-0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen :src="game.video.url">
                </iframe>
            </div>
            <div>
                <h1 class="ms-1 pb-1 border-bottom"><strong>{{ game.title }}</strong></h1>

                <div class="row mt-2 mb-3">
                <div class="col-4 ps-3">
                    <span class="mb-2">
                        {{ context.views }}; <i class="fa-regular fa-eye"></i> {{ game.view }}
                    </span>
                    <div class="">
                        <div class="d-flex">
                            <p class="m-0 p-0 me-2">{{ context.description }}</p>
                            <hr class="w-100 my-auto">
                        </div>
                        {{ game.description }}
                    </div>
                </div>
                <div class="col-4 position-relative">
                    <strong>{{ context.song }};</strong>
                    <div class="d-flex position-relative">
                        <div class="ratio ratio-21x9 banner-box rounded shadow" :style="'background-image: url(' + game.music.image + ');'"></div>
                        <div class="ratio ratio-21x9 banner rounded shadow position-absolute cute-purple-border" :style="'background-image: url(' + game.music.image + ');'"></div>
                    </div>
                    <a class="w-100 bottom-0 m-0 p-0 d-flex text-decoration-none text-light my-auto position-absolute" :href="game.music.url" target="_blank">
                        <div class="position-relative song-image justify-content-center w-100 h-100 m-auto ">
                            <div class="d-flex position-absolute top-0 left-0 play-icon">
                                <span class="m-auto justify-content-center m-auto">
                                    <i class="fa-solid fa-play" style="font-size: 24px;"></i>
                                </span>
                            </div>
                            <div class="ms-2 my-auto position-absolute">
                            <p class="m-0 p-0">{{ game.music.title }}</p>
                            <p class="m-0 p-0">{{ game.music.description }}</p>
                        </div>
                        </div>
                        
                    </a>
                </div>
                <div class="col-4 position-relative"> 
                    <strong>{{ context.game }};</strong>
                    <div class="position-relative d-flex ">
                        <div class="ratio ratio-21x9 banner-box rounded" :style="'background-image: url(' + game.game.banner.thumbnail + ');'"></div>
                        <div class="ratio ratio-21x9 banner rounded position-absolute cute-purple-border" :style="'background-image: url(' + game.game.banner.thumbnail + ');'"></div>
                    </div>
                    <!-- img class="ratio ratio-21x9" :src="game.game.banner.thumbnail" :alt="game.game.alt" style="object-fit: cover;"-->
                    <div class="p-1 pe-2 rounded-end bg-dark position-absolute bottom-0 mb-1 pb-1 ">
                        <a class="w-100 m-0 p-0 d-flex text-decoration-none text-light my-auto" :href="game.game.game_url" target="_blank">
                            <div class="position-relative song-image">
                            </div>
                            <div class="ms-2 my-auto">
                                <p class="m-0 p-0 fw-semibold"><i class="fa-solid fa-link"></i> {{ game.game.name }}</p>
                            </div>
                        </a>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-3 row m-0 p-0 h-100 d-flex">
            <div class="justify-content-center m-auto">
                <h3><strong>{{ context.comments }}</strong></h3>
                <hr class="w-100">
                <div class="form-group mb-2">
                    <label for="">Username</label>
                    <input type="text" class="form-control w-100 bg-transparent">
                </div>
                <div class="form-group mb-2">
                    <label >{{ context.comment }}</label>
                    <textarea class="form-control bg-transparent" name="" id="" cols="30" rows="5"></textarea>
                </div>
                <hr>
            </div>
        </div>
    </div>
    <div v-else class="text-light">
        loads-
    </div>
    </article>
</section>
</template>


<style scoped>
.banner-box{
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(4px);
}

.banner{
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

.cute-purple-border{
    border: 1px solid rgba(116, 1, 113, .8)
}

.song-image span {
    display: none;
}
.song-image:hover span {
    display: block;

}
</style>