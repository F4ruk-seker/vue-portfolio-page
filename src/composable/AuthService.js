// AuthService.js
import axios from 'axios';
import { useCookies } from "vue3-cookies";

const cookies = useCookies()

var date = new Date;
date.setDate(date.getDate() + 15);


class AuthService {
    save_temporary_session(token){
        sessionStorage.setItem('access', token.access)
        sessionStorage.setItem('refresh', token.refresh)
    }

    save_long_lasting_session(token){
        cookies.cookies.set('access', token.access, date)
        cookies.cookies.set('refresh', token.refresh, date)
    }

    async login(credentials) {
        try {
            cookies.cookies.set('pars', 'hangomes', '15d')
            const response =  await axios.post("auth/token/",
                credentials
            )
            if (response.status === 200){
                const token = await response.data
                if (credentials.remember_me){
                    cookies.cookies.set('remember_me', '1', date)
                    this.save_long_lasting_session(token)
                } else {
                    this.save_temporary_session(token)
                }
                return {login:true, use_otp: token.use_otp}
            }
            return false
        }catch (e) {
            return false
        }

    }
    logout() {
        sessionStorage.clear()
        cookies.cookies.remove('access')
        cookies.cookies.remove('refresh')
    }
    check_user_status(){
        try {
            axios.get(`user/`).then((response) => {
                return response.data
            })

        }catch (e) {
            console.log('error')
            console.log(e)
            return false
        }
    }
    async register(credentials) {
        const payload = await axios.post(`register/`, credentials);
        return payload.status === 201
    }

    getAccessToken() {
        return cookies.cookies.get('remember_me') ? cookies.cookies.get('access') : sessionStorage.getItem('access')
    }

    setAccessToken(token) {
        cookies.cookies.get('remember_me') ? cookies.cookies.set('access' , token) : sessionStorage.setItem('access', token)

    }

    getRefreshToken() {
        return cookies.cookies.get('remember_me') ? cookies.cookies.get('refresh') : sessionStorage.getItem('refresh')
    }

    refreshToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) {
            return Promise.reject('No refresh token available');
        }
        return axios.post(`auth/token/refresh/`, { refresh: refreshToken })
            .then(response => {
                const newAccessToken = response.data.access;
                this.setAccessToken(newAccessToken); // Update the access token
                return newAccessToken;
            });
    }

    async email_confirmation_token_control(token, census_token) {
        try {
            const response = await axios.get(`confirmation/${token}/?census_token=${census_token}`)
            console.log(response)
            console.log(response.data)
            console.log(response.status)
            return response.status
        } catch (e) {
            return 0
        }
    }

    async email_confirmation_accept(token, census_token){
        try {
            const response = await axios.post(`confirmation/${token}/`, {
                census_token:census_token
            })
            return response.status
        } catch (e) {
            Promise.reject(e)
        }
    }

    async remove_disapproved_user(token, census_token){
        try {
            const response = await axios.delete(`confirmation/${token}/`, {
                data: {
                    census_token:census_token
                }
            })
            return response.status
        } catch (e) {
            Promise.reject(e)

        }
    }

    async login_with_token(token){
        try {
            const response = await axios.put(`login_with_token/`, {
                token: token
            })
            this.save_session(await response.data)
            return response.status
        } catch (e) {
            console.log('err')
            console.log(e)
        }
    }

    async create_login_with_token(email){
        try {
            const response = await axios.post(`login_with_token/`, {
                email: email
            })
            console.log(response)
            console.log(response.data)
            console.log(response.status)
        } catch (e) {
            Promise.reject(e)

        }
    }

    async send_password_reset_token_request(email){
        await axios.post('password_reset/', {
            email: email
        })
    }

    async reset_password_token_validate(credentials){
        try {
            const response = await axios.put('password_reset/', credentials)
            return response.status
        } catch (e) {
            return e.response.status
        }

    }

    async reset_password_with_credentials(credentials){
        const response = await axios.put('password_reset/', credentials)
        return response.status
    }

    async otp(code){
        try {
            const response = await axios.post('/auth/otp/', {
                otp_code: code
            })
            return response.status
        } catch (e) {
            Promise.reject(e)
        }
    }
}

export default new AuthService();