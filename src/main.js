// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
import {
  Style,
  // basic
  Button,
  Loading,
  Tip,
  Toolbar,
  TabBar,
  TabPanels,
  // form
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Input,
  Textarea,
  Select,
  Switch,
  Rate,
  Validator,
  Upload,
  Form,
  // popup
  Popup,
  Toast,
  Picker,
  CascadePicker,
  DatePicker,
  TimePicker,
  SegmentPicker,
  Dialog,
  ActionSheet,
  Drawer,
  ImagePreview,
  // scroll
  Scroll,
  Slide,
  IndexList,
  Swipe,
  Sticky,
  ScrollNav,
  ScrollNavBar,
  RecycleList
} from 'cube-ui'
import App from './App'
import router from './router'

Vue.use(Button)
Vue.use(Loading)
Vue.use(Tip)
Vue.use(Toolbar)
Vue.use(TabBar)
Vue.use(TabPanels)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Select)
Vue.use(Switch)
Vue.use(Rate)
Vue.use(Validator)
Vue.use(Upload)
Vue.use(Form)
Vue.use(Popup)
Vue.use(Toast)
Vue.use(Picker)
Vue.use(CascadePicker)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(SegmentPicker)
Vue.use(Dialog)
Vue.use(ActionSheet)
Vue.use(Drawer)
Vue.use(ImagePreview)
Vue.use(Scroll)
Vue.use(Slide)
Vue.use(IndexList)
Vue.use(Swipe)
Vue.use(Sticky)
Vue.use(ScrollNav)
Vue.use(ScrollNavBar)
Vue.use(RecycleList)

Vue.config.productionTip = false

// import FastClick from 'fastclick' //引入fastclick,处理移动端300ms延迟
import 'lib-flexible/flexible.js' //vue rem移动端自适适配
// FastClick.attach(document.body) //将fastClicl绑定到body身上
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)
import './assets/iconfont/iconfont.css'
import store from './store/store' //使用vuex

//前端过滤器，对使用的ajax请求进行过滤处理
axios.defaults.baseURL = 'https://fucheng360.top'
axios.interceptors.request.use(config => {
  return config
},err => {
  $store.state.data = '请求超时！'
  this.Popup($store.state.data)
  return Promise.resolve(err)
  console.log($store.state.data)
})
axios.interceptors.response.use(config => {
  return config
}, err => {
  if (err.respone.status === 500|| err.respone.status ===504 || err.respone.status === 404) {
    $store.state.data = '服务器炸了⊙﹏⊙∥'
    this.Popup($store.state.data)
  } else {
    $store.state.data = '服务发生错误!'
    this.Popup($store.state.data)
  }
  return Promise.resolve(err)
})

//全局注册，方便在所有组件调用
//验证邮箱格式是否正确
Vue.prototype.isEmail = function (str) {
  let myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
  if(myReg.test(str)){
    return true
  } else {
    return false
  }
}
//控制Toast显隐
Vue.prototype.Popup = function (msg) {
  this.Msg = msg
  this.visible = true
  setTimeout(() => {
    this.visible = false
  }, 1000)
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
