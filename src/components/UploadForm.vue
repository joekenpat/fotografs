<template>
  <div @click.self="closeForm" class="backdrop">
    <div class="panel shade grid">
      <form class="form col-11-12 mx-auto">
        <div>
          <input
            v-model="authorName"
            type="text"
            class="inputs authorNameInput"
            placeholder="John Doe"
          />
        </div>
        <div>
          <input
            v-model="authorInitial"
            name=""
            type="text"
            maxlength="3"
            minlength="3"
            class="inputs initialsInput"
            placeholder="JDK"
          />
          <input
            v-model="brandColor"
            name="brandColor"
            type="color"
            class="inputs brandColorInput"
          />
          <input
            @change="inputToState"
            ref="imgx"
            type="file"
            accept=".png, .jpg, .jpeg"
            class="inputs imageInput"
          />
        </div>
        <div v-show="imageDataUrl" class="inputs imagePreview">
          <img :src="imageDataUrl" />
        </div>
        <div>
          <select
            name="brandFont"
            class="inputs brandFontSelect"
            v-model="brandFont"
          >
            <option selected value="choice">Choice</option>
            <option value="rossela">Rossela</option>
            <option value="signatrue">Signatrue</option>
          </select>
          <div class="brandFontPreview" :style="setCurrentFont()">
            {{ authorInitial }} - {{ authorName }}
          </div>
        </div>
        <div style="">
          <button
            :disabled="validateForm() || loading"
            type="button"
            @click.prevent="uploadImage()"
            class="upload_btn"
          >
            Upload{{ loading ? `ing...(${uploadValue.toFixed(2)}%)` : "" }}
          </button>
          <button type="cancel" @click.prevent="closeForm" class="cancel_btn">
            Cancel!
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
//import out instantiated firebase module
const fb = require("../firebaseConfig");
export default {
  data() {
    return {
      authorName: "",
      brandColor: "",
      authorInitial: "",
      brandFont: "choice",
      imageData: null,
      imageDataUrl: "",
      uploadValue: 0,
      loading: false,
    };
  },
  methods: {
    //reset the form to empty
    resetForm() {
      this.authorName = this.authorInitial = this.brandColor = this.imageDataUrl =
        "";
      this.imageData = null;
    },
    //check if all required field is filled
    validateForm() {
      let {
        authorName,
        brandColor,
        authorInitial,
        brandFont,
        imageData,
      } = this;
      return authorName && brandColor && authorInitial && brandFont && imageData
        ? false
        : true;
    },
    //emit this event to trigger the close form
    closeForm() {
      this.$emit("close-form");
    },
    //set the current font face for previewing
    setCurrentFont() {
      return {
        fontFamily: this.brandFont,
        color: this.brandColor,
      };
    },
    //save selected images to state
    inputToState(x) {
      let files = x.target.files || x.dataTransfer.files;
      this.imageData = files[0];
      if (files[0]) {
        this.imageDataUrl = window.URL.createObjectURL(this.imageData);
      } else {
        this.imageDataUrl = "";
      }
      console.log(this.imageData);
      console.log(this.imageDataUrl);
    },
    //get extension from filename
    getFileExtension(filename) {
      var ext = /^.+\.([^.]+)$/.exec(filename);
      return ext == null ? "" : ext[1];
    },
    //upload the selected image and branding data to firebase
    uploadImage() {
      this.loading = true;
      this.uploadValue = 0;
      let img = this.imageData;
      let uploadTask = fb.storage
        .ref(
          `fotografs/gallery-images/${(0 | (Math.random() * 9e6)).toString(
            36
          )}.${this.getFileExtension(img.name)}`
        )
        .put(img);
      uploadTask.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          console.log(error.message);
          this.loading = false;
        },
        () => {
          this.uploadValue = 100;
          //get url of uploaded file
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log({ img_url: url });
            let data = {
              authorName: this.authorName,
              authorInitial: this.authorInitial,
              brandFont: this.brandFont,
              brandColor: this.brandColor,
              imageUrl: url,
            };
            //add the branding data for the image
            fb.imageCollection.add({ ...data }).then((doc) => {
              console.log(doc.id);
              this.loading = false;
              setTimeout(() => {
                this.resetForm();
                this.$emit("close-form");
              }, 2000);
            });
          });
        }
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/styles/UploadForm.css"></style>
