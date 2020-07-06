import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false,
      title: '線上相簿'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      login: false,
      title: '線上相簿 | 註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      login: false,
      title: '線上相簿 | 登入'
    }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue'),
    meta: {
      login: true
      // title想做成 「使用者名稱」的相簿 ，所以不在這裡寫(這個頁面store還沒有使用者的名稱，這裡讀出來會是null/undefined之類的)
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = (to.name !== 'Album') ? to.meta.title : store.state.user + ' 的相簿'
  // if(to.name !== 'Album') document.title = to.meta.title
  // else document.title = store.state.user + ' 的相簿'
})

export default router
