import Vue from 'vue'
import Router from 'vue-router'

// 分块路由懒加载
const index = () => import('../components/index')
const login = () => import(/* webpackChunkName: "user-login" */ '../components/User/login')
const register = () => import(/* webpackChunkName: "user-register" */ '../components/User/register')
const task = () => import(/* webpackChunkName: "task-task" */ '../components/Task/task')
// const addTask = () => import('../components/Task/addTask')
const shoolCalendar = () => import(/* webpackChunkName: "user-login" */ '../components/Calendar/schoolCalendar')
const suggestion = () => import(/* webpackChunkName: "user-suggestion" */ '../components/User/suggestion')
const about = () => import(/* webpackChunkName: "user-about" */ '../components/User/about')
const modifyPassword = () => import(/* webpackChunkName: "user-modifyPassword" */ '../components/User/modifyPassword')
const mine = () => import(/* webpackChunkName: "user-mine" */ '../components/User/mine')
// import index from '../components/index'
// import login from '../components/User/login'
// import register from '../components/User/register'
// import task from '../components/Task/task'
// import shoolCalendar from '../components/Calendar/schoolCalendar'
// import suggestion from '../components/User/suggestion'
// import about from '../components/User/about'
// import modifyPassword from '../components/User/modifyPassword'
// import mine from '../components/User/mine'
const add = () => import(/* webpackChunkName: "task-add" */ '../components/Task/add')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/Task',
      children: [
        {
          path: '/Task',
          name: task,
          component: task
        },
        {
          path: '/Calendar',
          name: shoolCalendar,
          component: shoolCalendar
        },
        {
          path: '/Mine',
          name: 'mine',
          component: mine
        }
      ]
    },{
      path: '/User/register',
      name: 'register',
      component: register,
    },
    {
      path: '/User/login',
      name: 'login',
      component: login
    },
    // {
    //   path: '/Task/task',
    //   name: task,
    //   component: task
    // },
    // {
    //   path: '/Calendar',
    //   name: shoolCalendar,
    //   component: shoolCalendar
    // },
    {
      path: '/User/suggestion',
      name: suggestion,
      component: suggestion
    },
    {
      path: '/User/about',
      name: about,
      component: about
    },
    {
      path: '/User/modifyPassword',
      name: modifyPassword,
      component: modifyPassword
    },{
      path: '/Task/add',
      name: add,
      component: add
    }
  ]
})
