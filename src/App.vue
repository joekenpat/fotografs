<template>
  <div id="app">
    <div class="container">
      <div @click="formShow = !formShow" class="show-uploader-btn">
        {{ formShow ? "x" : "+" }}
      </div>
      <UploadForm ref="ufr" v-on:close-form="onCloseForm" v-show="formShow" />
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
              //height of the image
              width: resImageWidth,
              //widthu of the image
              height: resImageHeight,
            },
            {
              //add overlay text
              ot: titleCase(fbImage.authorName),
              //specify the font sizr
              ots: 24,
              //specify the position along the X-axis
              overlayX: 5,
              //specify the position along the Y-axis
              overlayY: 'N15',
              //set a predefined the width
              otw: 250,
              //set a predefined the height
              oth: 50,
              //apply a border radius
              or: '26',
              //set the text font face
              otf: fbImage.brandFont + '.ttf',
              //specify the alignment of the text
              otia: 'left',
              //set the color of the font
              otc: fbImage.brandColor.substring(1).toUpperCase(),
              //specify the padding size in all directions
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
//import our component for uploading images
import UploadForm from "./components/UploadForm";
//import out instantiated firebase module
const fb = require("./firebaseConfig");
export default {
  data() {
    return {
      resImageHeight: window.innerHeight * 0.6,
      resImageWidth: window.innerWidth,
      slideIndex: 0,
      formShow: false,
      gallery_images: [],
    };
  },
  created() {
    //load the images when the component is created
    this.loadImages();
  },
  components: {
    UploadForm,
  },
  methods: {
    //closes the upload form
    onCloseForm() {
      this.loadImages();
      this.formShow = false;
    },
    //transform string to Title Case
    titleCase(str) {
      return str
        .toLowerCase()
        .split(" ")
        .map((word) => {
          return word ? word.replace(word[0], word[0].toUpperCase()) : word;
        })
        .join(" ");
    },
    //controller to view previous image slide
    prevSlide() {
      if (this.slideIndex - 1 < 0) {
        this.slideIndex = this.gallery_images.length - 1;
      } else {
        this.slideIndex -= 1;
      }
    },
    //controller to view next image slide
    nextSlide() {
      if (this.slideIndex + 1 > this.gallery_images.length - 1) {
        this.slideIndex = 0;
      } else {
        this.slideIndex += 1;
      }
    },
    //controller to view a specific image slide
    setCurrentSlide(n) {
      this.slideIndex = n;
    },
    //load the links to the uploaded images from firebase firestore
    loadImages() {
      fb.imageCollection.onSnapshot((querySnapshot) => {
        this.gallery_images = [];
        querySnapshot.forEach((doc) => {
          let dtx = doc.data();
          let urlx = new URL(dtx.imageUrl);
          //push the results to local state
          this.gallery_images.push({
            id: doc.id,
            authorName: dtx.authorName,
            authorInitial: dtx.authorInitial,
            brandColor: dtx.brandColor,
            brandFont: dtx.brandFont,
            //strip away the domain from the url
            imageUrl: urlx.pathname + urlx.search + urlx.hash,
          });
        });
      });
    },
  },
};
</script>
<style src="@/styles/App.css">
/* import an external css file */
</style>
