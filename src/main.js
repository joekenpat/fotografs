import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import ImageKit from "imagekitio-vue"

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/udgwmvc6ioo", // Required. Default URL-endpoint is https://ik.imagekit.io/your_imagekit_id
  publicKey: "public_Y0ExTJA/Bg6I69kAE30teRjM16o=", // optional
});


new Vue({
  render: (h) => h(App),
}).$mount("#app");
