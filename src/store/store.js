import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// const state = {
//   data: 'this is data in state'
// },
//  mutations : {
//   output(state){
//     console.log(state.data)
//   }
//   console.log("mutations")
// },
//  actions : {
//   isEmail(str) {
//     let myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/
//     if(myReg.test(str)){
//       return true
//     } else {
//       return false
//     }
//   },
//   info(context) {
//     context.commit("output")
//     console.log("action")
//   }
// }
export default new Vuex.Store({
  // state,
  // mutations,
  // actions
})
// export const store = new Vuex.Store({
//   state: {
//     data: 'this is data in state'
//   },
//   mutations: {
//     output(state){
//       console.log(state.data)
//     }
//     // console.log("mutations")
//   },
//   actions: {
//     info(context) {
//       context.commit("output")
//       // console.log("action")
//     }
//   }
// })
