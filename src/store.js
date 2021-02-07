import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        access_token: null,
    },
    getters: {
        access_token: state => state.access_token
    },
    mutations: {
        updatedAccess(state, access_token) {
            state.access_token = access_token;
        }
    },
    actions: {
        signin({ commit }, authData){
            axios.post('http://127.0.0.1:8000/dj-rest-auth/registration/', {
                    email: authData.email,
                    username: authData.username,
                    password1: authData.password,
                    password2: authData.password2
                }, {
                    timeout: 5000
                }).then(response => {
                    console.log(response);
                    commit('updatedAccess', response.data.access_token);
                    router.push('/');
                })
        },
        login({ commit, dispatch }, authData){
            axios.post('http://127.0.0.1:8000/dj-rest-auth/login/', {
                    username: authData.username,
                    password: authData.password,
                }, {
                    timeout: 5000
                })
                .then(response => {
                    commit('updatedAccess', response.data.access_token);
                    setTimeout(() => {
                        dispatch('refreshAccessToken', response.data.refresh_token);
                    }, 5 * 60 * 1000)
                    router.push('/')
                }).catch(err => {
                    console.log(err);
                });
        },
        refreshAccessToken({ commit, dispatch }, refresh) {
            axios.post("http://127.0.0.1:8000/dj-rest-auth/token/refresh/", {
                refresh: refresh
            }).then(response => {
                commit('updatedAccess', response.data.access);
                setTimeout(() => {
                    dispatch('refreshAccessToken', response.data.refresh)
                }, 5 * 60 *1000)
            })
        }
    }

});

