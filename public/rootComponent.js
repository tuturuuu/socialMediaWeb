import navBarComponent from './components/navBarComponent.js'
import ChattingView from './views/ChattingView.js'
import RegisterView from './views/RegisterView.js'
import LoginView from './views/LoginView.js'
import Home from './views/HomeView.js'
import ProfileView from './views/ProfileView.js'
import footerComponent from './components/footerComponent.js'

const app = Vue.createApp({
    data(){
        return{
            authenticated:false
        }
    },
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },
    }, 
    mounted(){
        if(localStorage.getItem('token')){
            this.authenticated = true
        } else {
            this.authenticated = false
            this.$router.push('/login');
        }

    }
})

app.component('navbar-component', navBarComponent)
app.component('footer-component', footerComponent)

const routes = [
    { path: '/chatting', component: ChattingView, meta: { requiresAuth: true } },
    { path: '/register', component: RegisterView },
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/login', component: LoginView },
    { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },
  ]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && (localStorage.getItem('token') === null)) {
        next('/login')
    } else {
        next()
    }
})

app.use(router)

app.mount('#app')