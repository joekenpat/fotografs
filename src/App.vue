<template>
  <div id="app">
    <div class="container">
      <div @click="formShow = !formShow" class="show-uploader-btn">
        {{ formShow ? "x" : "+" }}
      </div>
      <UploadForm v-on:close-form="onCloseForm" v-show="formShow" />
      <div
        v-show="Object.keys(gallery_images).length > 0"
        :class="[
          'mySlidesContainer',
          x == slideIndex ? 'mySlidesActive' : 'mySlidesInactive',
        ]"
        v-for="(fbImage, x) in gallery_images"
        :key="fbImage.id"
      >
        <div class="numbertext">{{ x + 1 }} / {{ gallery_images.length }}</div>
        <ik-image
          :path="fbImage.imageUrl"
          loading="lazy"
          :lqip="{ active: true }"
          :transformation="[
            {
              width: resImageWidth,
              height: resImageHeight,
            },
            {
              ot: titleCase(fbImage.authorName),
              ots: 24,
              overlayX: 5,
              overlayY: 'N15',
              otw: 250,
              oth: 50,
              or: '26',
              otf: fbImage.brandFont + '.ttf',
              otia: 'left',
              otc: fbImage.brandColor.substring(1).toUpperCase(),
              otp: '1_25_1_55',
            },
            {
              ot: fbImage.authorInitial,
              ots: 18,
              overlayX: 10,
              overlayY: 'N18',
              otc: 'FFFFFF',
              ott: 'b',
              otbg: fbImage.brandColor.substring(1).toUpperCase(),
              otf: fbImage.brandFont + '.ttf',
              or: 50,
              otw: 43,
              oth: 50,
              otp: '3_5',
            },
          ]"
        />
      </div>

      <a
        v-show="Object.keys(gallery_images).length > 0"
        class="prev"
        @click="prevSlide()"
        >❮</a
      >
      <a
        v-show="Object.keys(gallery_images).length > 0"
        class="next"
        @click="nextSlide()"
        >❯</a
      >
      <div v-show="Object.keys(gallery_images).length > 0" class="row">
        <div
          class="column"
          v-for="(fbImageThumb, y) in gallery_images"
          :key="fbImageThumb.id"
          @click="setCurrentSlide(y)"
        >
          <ik-image
            :class="['demo thumb', y == slideIndex ? 'active' : '']"
            :path="fbImageThumb.imageUrl"
            style="width:100%"
            :alt="fbImageThumb.brandName"
            loading="lazy"
            :lqip="{ active: true }"
            :transformation="[{ width: 150, height: 100 }]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadForm from "./components/UploadForm";
const fb = require("./firebaseConfig");
export default {
  data() {
    return {
      resImageHeight: window.innerHeight * 0.6,
      resImageWidth: window.innerWidth,
      slideIndex: 0,
      formShow: false,
      uploadingImage: false,
      gallery_images: [],
    };
  },
  created() {
    this.loadImages();
  },
  components: {
    UploadForm,
  },
  methods: {
    onCloseForm() {
      this.loadImages();
      this.formShow = false;
    },
    titleCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word ? word.replace(word[0], word[0].toUpperCase()) : word;
        })
        .join(" ");
    },
    prevSlide() {
      if (this.slideIndex - 1 < 0) {
        this.slideIndex = this.gallery_images.length - 1;
      } else {
        this.slideIndex -= 1;
      }
    },
    nextSlide() {
      if (this.slideIndex + 1 > this.gallery_images.length - 1) {
        this.slideIndex = 0;
      } else {
        this.slideIndex += 1;
      }
    },
    setCurrentSlide(n) {
      this.slideIndex = n;
    },
    loadImages() {
      fb.imageCollection.onSnapshot((querySnapshot) => {
        this.gallery_images = [];
        querySnapshot.forEach((doc) => {
          let dtx = doc.data();
          let urlx = new URL(dtx.imageUrl);
          this.gallery_images.push({
            id: doc.id,
            authorName: dtx.authorName,
            authorInitial: dtx.authorInitial,
            brandColor: dtx.brandColor,
            brandFont: dtx.brandFont,
            imageUrl: urlx.pathname + urlx.search + urlx.hash,
          });
        });
      });
    },
  },
};
</script>
<style src="@/styles/App.css"></style>
