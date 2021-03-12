# fotografs

## Project setup

### install dependencies

```
yarn install
```

### Firebase Config

get config object from **firebase** project replace the dummy values in the config file with the actual keys, then rename: `firebaseConfig.js.example` to `firebaseConfig.js`

```
./firebaseConfig.js


const config = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXX.firebaseapp.com",
  databaseURL: "https://XXXXXXXXXXX.firebaseio.com",
  projectId: "XXXXXXXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXX.appspot.com",
  messagingSenderId: "XXXXXXXXXXXXXX",
  appId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
};
```

### ImageKit Credentials

obtain your `public key` and `url-endpoint` from **imageKit** developer page in your dashboard replace the dummy values in the `main.js`

```
./main.js


Vue.use(ImageKit, {
  urlEndpoint: "https://ik.imagekit.io/xxxxxxxx",
  publicKey: "public_XXXXXXXXXXXXXXXXXXXXXXXXX"
});
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```
