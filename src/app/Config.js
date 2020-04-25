import * as firebase from 'firebase';

export const appConfig = {
  apiKey: "AIzaSyD9OrfosiC9RzAyHb--heBd_3p8mWU9OG4",
  authDomain: "fshool-project.firebaseapp.com",
  databaseURL: "https://fshool-project.firebaseio.com",
  projectId: "fshool-project",
  storageBucket: "fshool-project.appspot.com",
  messagingSenderId: "775779792702",
  appId: "1:775779792702:web:ba5325e3d7ae6fd3169e6f",
  measurementId: "G-SC2EQ1BL5R"
};

export const db = firebase.initializeApp(appConfig);
