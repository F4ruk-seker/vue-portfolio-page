// AuthService.js
import axios from 'axios';
import {useStore} from "vuex";


const store = useStore()
console.log(store)

class AuthService {
    save_session(token){
        sessionStorage.setItem('access', token.access)
        sessionStorage.setItem('refresh', token.refresh)
        sessionStorage.setItem('AuthStatus', '1')

    }

    async login(credentials) {
        try {
            const response =  await axios.post("auth/token/",
                credentials
            )
            if (response.status === 200){
                const token = await response.data
                console.log('set lo')
                // store.
                // store.commit('set_user', {user:token})
                this.save_session(token)
                return token
            }
            return false
        }catch (e) {
            return false
        }

    }
    logout() {
        sessionStorage.clear()
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
        return sessionStorage.getItem('access');
    }

    setAccessToken(token) {
        sessionStorage.setItem('access', token);
    }

    removeAccessToken() {
        sessionStorage.removeItem('access');
    }

    refreshToken() {
        const refreshToken = sessionStorage.getItem('refresh');
        console.log('refreshToken')
        console.log(refreshToken)
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

    async otp_test(){
        await axios.get('/auth/otp_test/')
    }
}

export default new AuthService();
