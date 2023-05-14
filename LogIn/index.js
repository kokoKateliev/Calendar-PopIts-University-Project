import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js"
import { app } from "../index.js"

function handleLogIn(event){
    event.preventDefault()
    const email =  document.getElementById("email").value
    const password = document.getElementById("psw").value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      window.localStorage.setItem("localUserEmail", email)
      const userProfile = window.localStorage.getItem(email);
      const getObj = JSON.parse(userProfile);
      window.localStorage.setItem("localNickname", getObj.name)
      window.location.href = "/CalendarPage/index.html"
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message

      alert("Invalid email or wrong password. Please try again")
    })

}
const auth = getAuth(app);
const submintButton = document.getElementById("btn-logIn")
submintButton.addEventListener("click", handleLogIn)
