import Vue from 'vue';
import Vuex from 'vuex';
import axios from './api-axios';
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        access_token: null,
        user_id: null,
    },
    getters: {
        access_token: state => state.access_token,
        user_id: state => state.user_id,
    },
    mutations: {
        updatedAccess(state, access_token) {
            state.access_token = access_token;
        },
        updateUserId(state, user_id) {
            state.user_id = user_id;
        }
    },
    actions: {
        async autoLogin({
            commit,
            dispatch
        }) {
            const access_token = localStorage.getItem('access_token');
            const user_id = localStorage.getItem('user_id');
            if (!access_token) return;
            const now = new Date();
            const expiryTimeMs = localStorage.getItem('expiryTimeMs');
            const isExpired = now.getTime() >= expiryTimeMs;
            const refresh_token = localStorage.getItem('refresh_token');
            if (isExpired) {
                await dispatch('refreshAccessToken', refresh_token);
            } else {
                const expiresInMs = expiryTimeMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshAccessToken', refresh_token);
                }, expiresInMs);
                commit('updatedAccess', access_token);
                commit('updateUserId', user_id);
            }
        },
        signin({
            dispatch
        }, authData) {
            axios.post('/dj-rest-auth/registration/', {
                    email: authData.email,
                    username: authData.username,
                    password1: authData.password,
                    password2: authData.password2
                })
                .then(response => {
                    dispatch('setAuthData', {
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token,
                        user_id: response.data.user.pk,
                    })
                    router.push('/');
                })
        },
        login({
            dispatch
        }, authData) {
            axios.post('/dj-rest-auth/login/', {
                    username: authData.username,
                    password: authData.password,
                })
                .then(response => {
                    dispatch('setAuthData', {
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token,
                        user_id: response.data.user.pk,
                    })
                    router.push('/')
                }).catch(err => {
                    console.log(err);
                });
        },
        logout({
            commit
        }) {
            commit('updatedAccess', null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_id');
            router.replace('/login');
        },
        async refreshAccessToken({
            dispatch
        }, refresh) {
            await axios.post("/dj-rest-auth/token/refresh/", {
                refresh: refresh
            }).then(response => {
                dispatch('setAuthData', {
                    access_token: response.data.access,
                    refresh_token: response.data.refresh,
                    user_id: localStorage.getItem('user_id')
                })
            })
        },
        setAuthData({
            commit,
            dispatch
        }, authData) {
            const now = new Date();
            const expiryTimeMs = now.getTime() + 60 * 60 * 1000;
            commit('updatedAccess', authData.access_token);
            commit('updateUserId', authData.user_id);
            commit('updateUserId', authData.user_id);
            localStorage.setItem('access_token', authData.access_token);
            localStorage.setItem('refresh_token', authData.refresh_token);
            localStorage.setItem('expiryTimeMs', expiryTimeMs);
            localStorage.setItem('user_id', authData.user_id);
            setTimeout(() => {
                dispatch('refreshAccessToken', authData.refresh_token);
            }, 60 * 60 * 1000)
        }
    }

});