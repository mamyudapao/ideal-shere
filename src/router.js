import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home';
import Login from './components/modules/Login';
import Register from './components/modules/Register';
import store from './store';
import Article from './pages/Article'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'home',
            component: Home,
            props: true,
            beforeEnter(to, from, next) {
                if (store.getters.access_token) {
                    next();
                } else {
                    next('login');
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter(to, from, next) {
                if (store.getters.access_token) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: '/signin',
            name: 'signin',
            component: Register,
            beforeEnter(to, from, next) {
                if (store.getters.access_token) {
                    next('/');
                } else {
                    next();
                }
            }
        },
        {
            path: '/detail/:id',
            component: Article,
            name: 'detail',
        }
    ]
})