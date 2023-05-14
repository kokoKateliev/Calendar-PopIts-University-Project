// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArzhYnUvMcm-IBQdZEih1iw1gAWL7WTsg",
  authDomain: "fmi-popits.firebaseapp.com",
  projectId: "fmi-popits",
  storageBucket: "fmi-popits.appspot.com",
  messagingSenderId: "216198014889",
  appId: "1:216198014889:web:be3976f0e605554e7406b8",
  measurementId: "G-VE8BW2V5RM"
};

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// //save an array
// const myBlogs = ["test", "test"];
// window.localStorage.setItem('accounts', JSON.stringify(myBlogs));

// const storedBlogs = JSON.parse(localStorage.getItem('accounts'));
// console.log(storedBlogs)


// // an object
// const John = {
//   name: "John Doe",
//   age: 23,
// }

// // convert object to JSON string

// // using JSON.stringify()
// const jsonObj = JSON.stringify(John)

// // save to localStorage
// window.localStorage.setItem("John", jsonObj)


// // // // read
// // get the string from localStorage
// const str = window.localStorage.getItem("John")

// // convert string to valid object
// const parsedObj = JSON.parse(str)

// console.log(parsedObj)



// // // adding object to objects
// const target = { a: {"test":"test"}, b: {} }
// const source = { c: {}, d: {} }
// console.log(target)
// const returnedTarget = Object.assign(target, source)

// console.log(returnedTarget)
// // Expected output: Object { a: 1, b: 4, c: 5 }

// console.log(returnedTarget === target)
// // Expected output: true

// const jsonObj = JSON.stringify(John)