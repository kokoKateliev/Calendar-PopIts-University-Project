import { app } from "../index.js"
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js"
import { getDatabase, ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const db = getDatabase(app);
const dataRef = ref(db, "accounts")

function CheckPassword(text) { 
  const passwordCode=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  if(text.match(passwordCode)) { 
    return true;
  }
  else { 
    alert('Please check your password. It must contain at least one numeric digit, one uppercase and one lowercase letter.')
    return false;
  }
}

function ValidateEmail(inputText) {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(inputText.match(mailformat)) {
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
}

function handleRegister(event){
    event.preventDefault()
    const accountsRef = push(dataRef)

    const email =  document.getElementById("email").value
    const nickname =  document.getElementById("nickname").value
    const password = document.getElementById("psw").value
    if(CheckPassword(password) && ValidateEmail(email)){
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.localStorage.setItem("localUserEmail", email)
        window.localStorage.setItem("localNickname", nickname)
        const profile = {
          "name": nickname,
          "friends": [],
          "pendingFriends": [],
          "pendingEvents": [],
          "participate": []
        }
        const profileObj = JSON.stringify(profile)
        localStorage.setItem(email, profileObj)
        window.location.href = "/CalendarPage/index.html"

        // // // RTDB set
        // set(accountsRef, {
        //   "email" : email,
        //   "nickname" : nickname,
        //   "friends" : [],
        //   "pending" : [""],
        //   "participating" : [""]
        // })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert("Email already exists. Please check your entry.")
      })
    }

}
const auth = getAuth(app);
const submintButton = document.getElementById("btn-register")
submintButton.addEventListener("click", handleRegister)