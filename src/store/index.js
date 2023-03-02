import {createStore} from 'vuex'
import CookiesUtil from "@/util/Cookie";

// Create a new store instance.
export const store = createStore({
    state() {
        return {
            isLogin: true
        }
    },
    mutations: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        },
        setAccessToken(context, payload) {
            CookiesUtil.setAccessToken(payload)
        },
        setRefreshToken(context, payload) {
            CookiesUtil.setRefreshToken(payload)
        },
    },
    actions: {
        login(context) {
            context.commit('login')
        },
        logout(context) {
            context.commit('logout')
            CookiesUtil.removeAccessToken()
            CookiesUtil.removeRefreshToken()
            localStorage.clear()
            sessionStorage.clear()
        },
        setAccessToken(context, payload) {
            context.commit('setAccessToken', payload)
        },
        setRefreshToken(context, payload) {
            context.commit('setRefreshToken', payload)
        },
    }
})
