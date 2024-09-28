<template>
<section class="container d-flex m-auto">
    <article class="w-100 my-auto"><hr></article>
    <article><h1 class="text-center justify-content-center m-auto">{{ user_is_language_Turkish ? 'PLATFORMS':'PLATFORUMLAR' }}</h1></article>
    <article class="w-100 my-auto"><hr></article>
</section>
<section class="container d-flex m-auto">
    <p v-if="user_is_language_Turkish">
    </p>
    <p v-else>
    </p>
</section>
<section class="container row m-auto p-0 dark-mode.text-danger">
    <article class="col-12 col-md-6 p-2">
        <div class="card">
            <div class="card-header">
                <img
                    src="https://res.cloudinary.com/dlusw5ukg/image/upload/v1727551200/portfolyo/content/platforms/Upwork-Logo-Black.svg_o8esl1.png"
                    alt="Upwrok"
                    class="img-fluid col-6 col-md-4"
                >
            </div>
            <div class="card-body bg-transparent" style="background-color: transparent!important;">
                <p v-if="user_is_language_Turkish">
                    Eğer projelerim ilginizi çektiyse veya aklınızda bir iş fikri varsa, <span class="text-primary fw-bold">Upwork</span> profilim üzerinden bana ulaşabilirsiniz. Sizi dinlemekten memnuniyet duyarım!
                    <br><strong class="text-warning">Not:</strong> <span class="fw-bold">Upwork</span> politikaları gereği, profilime <span class="fw-bold">Upwork</span> üzerinden ulaştıysanız, tüm iş görüşmelerini platform üzerinden gerçekleştirmemiz zorunludur.
                </p>
                <p v-else>
                    If you liked my work or have a project idea in mind, feel free to visit my <span class="text-primary fw-bold">Upwork</span> profile and get in touch with me. I’d be happy to discuss how we can work together!
                    <br><strong class="text-warning">Note:</strong> As per <span class="fw-bold">Upwork</span> policies, if you found me through <span class="fw-bold">Upwork</span>, all job discussions must be conducted via the platform.
                </p>
            </div>
            <div class="card-footer">
                <a class="link-primary fw-bold" href="https://www.upwork.com/freelancers/~01f0bb9448698f5ef2" target="_blank">Faruk Şeker Upwork Profile</a>
            </div>
        </div>
    </article>
    <article class="col-12 col-md-6 p-2">
        <div class="card">
            <div class="card-header">
                <img
                    src="https://res.cloudinary.com/dlusw5ukg/image/upload/c_pad,w_512,h_142/v1727551635/portfolyo/content/platforms/bionluk_logo_gk_mwhttg.png"
                    alt="Bionluk"
                    class="img-fluid col-6 col-md-4"
                >
            </div>
            <div class="card-body">
                <p v-if="user_is_language_Turkish">
                    Eğer projelerim ilginizi çektiyse veya aklınızda bir iş fikri varsa, <span class="text-danger fw-bold">Bionluk</span> profilim üzerinden bana ulaşabilirsiniz. Sizi dinlemekten memnuniyet duyarım!
                    <br><strong class="text-warning">Not:</strong> <span class="fw-bold">Bionluk</span> politikaları gereği, profilime <span class="fw-bold">Bionluk</span> üzerinden ulaştıysanız, tüm iş görüşmelerini platform üzerinden gerçekleştirmemiz zorunludur.
                </p>
                <p v-else>
                    If you liked my work or have a project idea in mind, feel free to visit my <span class="text-danger">Bionluk</span> profile and get in touch with me. I’d be happy to discuss how we can work together!
                    <br><strong class="text-warning">Note:</strong> As per <span class="fw-bold">Bionluk</span> policies, if you found me through <span class="fw-bold">Bionluk</span>, all job discussions must be conducted via the platform.
                </p>
            </div>
            <div class="card-footer">
                <a class="link-danger fw-bold" href="https://bionluk.com/f4rukseker" target="_blank">Faruk Şeker Bionluk Profile </a>
            </div>
        </div>
    </article>
    <article class="col-12 p-2">
        <div class="card">
            <div class="card-header">
                <h2 class="card-title text-success fw-bold" v-if="user_is_language_Turkish">Direkt iletişim</h2>
                <h2 class="card-title text-success fw-bold" v-else>Direct</h2>
            </div>
            <div class="card-body">
                <p v-if="user_is_language_Turkish">
                    Eğer projelerim ilginizi çektiyse veya aklınızda bir iş fikri varsa, Bana ulaşabilirsiniz. Sizi dinlemekten memnuniyet duyarım!
                    <router-link :to="{name: 'contact'}" class="fw-semibold">Online görüşme için iletişime geçin.</router-link>
                </p>
                <p v-else>
                    If you liked my work or have a project idea in mind, feel free to reach out to me. I’d be happy to hear from you!
                    <router-link :to="{name: 'contact'}" class="fw-semibold">Contact me to schedule an online meeting.</router-link>
                </p>
            </div>
            <div class="card-footer">
                <router-link :to="{name: 'contact'}" class="fw-bold">Contact Form</router-link>
            </div>
        </div>
    </article>
</section>
</template>

<script setup>
import { ref } from 'vue'
const user_is_language_Turkish = ref(window.navigator.language === 'tr-TR')
</script>

<style>
.dark-mode .card{
    background-color: transparent!important;
}
</style>