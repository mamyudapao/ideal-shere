import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/pages/Home';
import Login from './components/modules/Login';

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { 
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

