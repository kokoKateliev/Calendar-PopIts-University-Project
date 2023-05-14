// import { app } from "../index.js"
// import { getDatabase, ref, push, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// const db = getDatabase(app);
// const dataRef = ref(db, "events")

// function handleBD(event) {
//   event.preventDefault()
//   const eventRef = push(dataRef)
//   const title = document.getElementById("title").value
//   document.getElementById("title").value = ""
//   const start = document.getElementById("meeting-time-start").value
//   document.getElementById("meeting-time-start").value = new Date().toISOString().slice(0,16)
//   const end = document.getElementById("meeting-time-end").value
//   document.getElementById("meeting-time-end").value = new Date().toISOString().slice(0,16)
//   const details = document.getElementById("details").value
//   document.getElementById("details").value = ""
//   // set(eventRef, {
//   //   "title" : title,
//   //   "creater" : window.localStorage.getItem("userEmail"),
//   //   "start" : start,
//   //   "end" : end,
//   //   "details" : details,
//   //   "participants" : [window.localStorage.getItem("userEmail")],
//   //   "comments" : [],
//   // })
// }
function clear(){
  window.localStorage.setItem("localUserEmail", "")
  window.localStorage.setItem("localNickname", "") 
}

const radioEventPrivacy = document.querySelectorAll('input[name="eventPrivacy"]')
const localUser = window.localStorage.getItem("localUserEmail")
const list = [localUser]
var eventPrivacy;
function handleBD(event) {
  event.preventDefault()
  const title = document.getElementById("title").value
  document.getElementById("title").value = ""
  const start = document.getElementById("meeting-time-start").value
  document.getElementById("meeting-time-start").value = new Date().toISOString().slice(0,16)
  const end = document.getElementById("meeting-time-end").value
  document.getElementById("meeting-time-end").value = new Date().toISOString().slice(0,16)
  const details = document.getElementById("details").value
  document.getElementById("details").value = ""
  
  if (radioEventPrivacy[0].checked) {
    eventPrivacy = "public"
  }
  else{
    eventPrivacy = "private"
  }
  const events = localStorage.getItem("events")
  const eventsObj = JSON.parse(events)

  const Event = {
    "creator": localUser,
    "title": title,
    "start": start,
    "end": end,
    "details": details,
    "participants": list,
    "eventPrivacy": eventPrivacy
  }

  eventsObj.push(Event)
  const jsonObj = JSON.stringify(eventsObj)
  window.localStorage.setItem("events", jsonObj)

  list.forEach(element => {
    const user = window.localStorage.getItem(element)
    const userObj = JSON.parse(user)
    if(element === localUser){
     userObj.participate.push(title)
    }
    else{
     userObj.pendingEvents.push(title)
    }
    const obj = JSON.stringify(userObj)
    window.localStorage.setItem(element, obj) 
  })

}
const submintButton = document.getElementById("btn-creator")
submintButton.addEventListener("click", handleBD)


const box = document.getElementById("box")
function handleRadioClick() {
  if (document.getElementById('public').checked) {
    box.style.visibility = 'visible'
  } else {
    box.style.visibility = 'hidden'
  }
}

const radioButtons = document.querySelectorAll('input[name="eventPrivacy"]');
radioButtons.forEach(radio => {
  radio.addEventListener('click', handleRadioClick)
})
// ako eventa e public dobavqsh priqteli

function handleAddingParticipant(event) {
  event.preventDefault()
  const title = document.getElementById("title").value
  const getEmail = document.getElementById("participants")
  const emailInput = getEmail.value.trim()
  const user = window.localStorage.getItem(emailInput)
  if(user){                                     // check if it is real email
    const userObj = JSON.parse(user)
    if(userObj.friends.includes(localUser)) {   // check if it is in friendlist
      if(!list.includes(emailInput)){            // ako veche mse mu pratili
        list.push(emailInput)
        getEmail.innerHTML = ""
      }
      else{
        alert("You already sent invitation!")
      }
    }
    else{
      alert("Sorry you are not friends with this person")
    }
  }
  else{
    alert("Invalid email")
  }
  console.log(list)
}
const emailFriendInput = document.getElementById("addParticipant")
emailFriendInput.addEventListener("click", handleAddingParticipant)

// set min valuess
const today = new Date().toISOString().slice(0,16)
document.getElementById("meeting-time-start").value = today
document.getElementById("meeting-time-start").setAttribute("min", today)
document.getElementById("meeting-time-end").value = today
document.getElementById("meeting-time-end").setAttribute("min", today)

document.getElementById("meeting-time-start").addEventListener("change", event => {
  const startTime = document.getElementById("meeting-time-start").value
  document.getElementById("meeting-time-end").value = startTime
  document.getElementById("meeting-time-end").setAttribute("min", startTime)
})

