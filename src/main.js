import Vue from "vue";
import App from "./App.vue";

//import imagekit vue module
import ImageKit from "imagekitio-vue";

Vue.config.productionTip = false;

//initialize imagekit and make it global
Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/xxxxxxxx",
  publicKey: "public_XXXXXXXXXXXXXXXXXXXXXXXXX",
});

new Vue({
  render: (h) => h(App),
}).$mount("#app");
