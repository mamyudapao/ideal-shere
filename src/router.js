import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/Home';
import Login from './components/modules/Login';
import Register from './components/modules/Register';
import MyPage from './pages/MyPage';
import store from './store';
import Article from './pages/Article';
import GroupChat from './pages/GroupChat';
import ChatRoom from './pages/ChatRoom';



Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Home',
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
        },
        {
            path: '/mypage/:id',
            component: MyPage,
            name: 'mypage'
        },
        {
            path: '/chat-room/',
            component: GroupChat,
            name: 'room-list'
        },
        {
            path: '/chat-room/:id',
            component: ChatRoom,
            name: 'chat-room'
        },
    ]
})