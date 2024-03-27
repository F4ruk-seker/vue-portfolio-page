<script setup>
import {ref} from 'vue'
import AuthService from "@/composable/AuthService";
import { useRouter } from 'vue-router'


const username = ref('')
const password = ref('')
const otp_code = ref('')
const remember_me = ref(false)
const otp_form = ref(false)
const router = useRouter()
const login_submit_btn = ref()
const send_login_request = ref(false)
async function send_login() {
  send_login_request.value = true
  const login_data = await AuthService.login({
    username:username.value, password:password.value, remember_me:remember_me.value
  })
  if  (login_data.has_otp){
    otp_form.value = true
  }else {
      if (login_data){
        router.push({'name': 'admin-home'})
      } else {
        await shake_form_btn(login_submit_btn.value)

      }
  }
  send_login_request.value = false

}

function send_otp() {
  AuthService.otp_test()
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function shake_form_btn(btn){
  btn.classList.add('form-error')
  await sleep(500)
  btn.classList.remove('form-error')
}
</script>

<template>
<form @submit.prevent="send_login" v-if="!otp_form" class="border rounded p-3 shadow" style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
  <div class="text-center border-bottom pb-2 mb-2">
    <strong class="fw-bold text-light">Login</strong>
  </div>

  <div class="mb-3">
    <label for="email_input" class="form-label text-light fw-bold">Username<span class="text-danger ms-1">*</span></label>
    <input v-model="username" type="text" autocapitalize="off" autofocus autocomplete="on" class="form-control text-light fw-bold shadow" id="email_input" placeholder="username" required  style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
  </div>
  <div class="mb-3">
    <label for="password_input" class="form-label">Password<span class="text-dangertext-light fw-bold ms-1">*</span></label>
    <input v-model="password" type="password" class="form-control text-light fw-bold shadow" id="password_input" placeholder="password" required name="password" autocomplete="on" style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
  </div>
  <div class="mb-3">
    <input type="checkbox" v-model="remember_me" id="remember-me">
    <label for="remember-me" class="ms-1">Remember Me</label>
  </div>
  <hr>
  <button ref="login_submit_btn" class="btn btn-primary w-100 shadow border" type="submit" style="border-color: rgba(255,255,255,0.53)!important;" :disabled="send_login_request">
    <span v-if="send_login_request" class="spinner-grow spinner-grow-sm text-light" role="status">
      <span class="sr-only">Loading...</span>
    </span>
  <span v-else>Login</span>
  </button>

  <!--button class="btn btn-primary w-100 shadow border" type="submit" style="border-color: rgba(255,255,255,0.53)!important;">Login</button-->
  <div class="d-flex">
    <hr class="w-100 text-light opacity-25">
    <span class="my-auto mx-2 fw-semibold text-light">OR</span>
    <hr class="w-100 text-light opacity-25">
  </div>
  <router-link :to="{name:'register'}" type="button" class="btn btn-success w-100 shadow border" style="border-color: rgba(43, 184, 66, 0.53)!important;">REGISTER</router-link>
</form>
<form @submit.prevent="send_otp" v-else class="border rounded p-3 shadow" style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
  <div class="mb-3">
    <label for="otp_input" class="form-label text-light fw-bold">OTP<span class="text-danger ms-1">*</span></label>
    <input v-model="otp_code" type="number" class="form-control text-light fw-bold shadow" id="otp_input" placeholder="OTP :)" required  style="border-color: rgba(255,255,255,0.53)!important;background: transparent!important;">
  </div>
  <hr>
  <button type="submit" class="btn btn-primary w-100 shadow border" style="border-color: rgba(255,255,255,0.53)!important;">SEND</button>
</form>

</template>

<style scoped>
.form-error{
    animation: shake 0.5s;
    animation-iteration-count: infinite;
    background-color: var(--bs-danger);
  }
  
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }


input {
  background: transparent !important;
}
label{
  color: var(--bs-primary);
}
</style>
