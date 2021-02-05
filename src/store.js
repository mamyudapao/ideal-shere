import Vue from 'vue';
import Vuex from 'vuex';
import axios from './axios-jwt-auth';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        access: null
    },
    getters: {
        access: state => state.access
    },
    mutations: {
        updatedAccess(state, access) {
            state.access = access;
        }
    },
    actions: {
        signin({commit}, authData) {
            axios.post('', {
                email: authData.email,
                username: authData.username,
                password1: authData.password,
                password2: authData.password2
            })
            .then(response => {
                console.log(response);
                commit('updatedAccess', response.access);

            })
        }
    }
})