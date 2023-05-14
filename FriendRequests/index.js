function clear(){
  window.localStorage.setItem("localUserEmail", "")
  window.localStorage.setItem("localNickname", "") 
}

const localUserEmail = window.localStorage.getItem("localUserEmail")
const localUser = window.localStorage.getItem(localUserEmail)
const localObj = JSON.parse(localUser)
const ul = document.getElementById("requestsList")
const eventUl = document.getElementById("eventRequestsList")
if(localObj.pendingFriends !== null) {
  ul.innerHTML=""
  localObj.pendingFriends.forEach((item) => {
    let li = document.createElement("li")
    li.innerHTML = `
      <span>${item}</span>
      <input type="button" class="button acc" id="accept" name="${item}" value="Accept"/>
      <input type="button" class="button rej" id="reject" name="${item}" value="Reject"/>

    `
    ul.appendChild(li)
  });
}

if(localObj.pendingEvents !== null) {
  eventUl.innerHTML=""
  localObj.pendingEvents.forEach((item) => {
    let li = document.createElement("li")
    li.innerHTML = `
      <span>${item}</span>
      <input type="button" class="button eAcc" id="acceptEvent" name="${item}" value="Accept"/>
      <input type="button" class="button eRej" id="rejectEvent" name="${item}" value="Reject"/>

    `
    eventUl.appendChild(li)
  });
}

if(ul.childNodes.length === 0){
  const cell = document.createElement("div")
  cell.className = "empty"
  cell.innerHTML = "There aren't any new friend requests :("
  ul.appendChild(cell)
}

if(eventUl.childNodes.length === 0){
  const cell = document.createElement("div")
  cell.className = "empty"
  cell.innerHTML = "There aren't any new event requests :("
  eventUl.appendChild(cell)
}

function handleAcceptingFriendRequest(event){
  const email = event.target.name
  const pendingUser = window.localStorage.getItem(email)
  const pedningObj = JSON.parse(pendingUser)
  localObj.pendingFriends.filter((mails, index) => {
    if (mails === email) {
      localObj.pendingFriends.splice(index, 1)
      return
    }
  })
  pedningObj.friends.push(localUserEmail)
  localObj.friends.push(email)
  const pendingUserToLocalStorage = JSON.stringify(pedningObj)
  const localUserToLocalStorage = JSON.stringify(localObj)
  window.localStorage.setItem(email, pendingUserToLocalStorage)
  window.localStorage.setItem(localUserEmail, localUserToLocalStorage)
  event.target.parentElement.remove()
}

const accButtons = document.querySelectorAll(".acc")
accButtons.forEach(button =>{
  button.addEventListener("click",handleAcceptingFriendRequest)
})


function handleRejectingFriendRequest(event){
  const email = event.target.name
  localObj.pendingFriends.filter((mails, index) => {
    if (mails === email) {
      localObj.pendingFriends.splice(index, 1)
      return
    }
  })
  const localUserToLocalStorage = JSON.stringify(localObj)
  window.localStorage.setItem(localUserEmail, localUserToLocalStorage)
  event.target.parentElement.remove()
}

const rejButtons = document.querySelectorAll(".rej")
rejButtons.forEach(button =>{
  button.addEventListener("click",handleRejectingFriendRequest)
})


function handleAcceptingEventRequest(event){
  const title = event.target.name
  localObj.pendingEvents.filter((events, index) => {
    if (events === title) {
      localObj.pendingEvents.splice(index, 1)
      return
    }
  })
  localObj.participate.push(title)
  const localUserToLocalStorage = JSON.stringify(localObj)
  window.localStorage.setItem(localUserEmail, localUserToLocalStorage)
  event.target.parentElement.remove()
}

const accEventButtons = document.querySelectorAll(".eAcc")
accEventButtons.forEach(button =>{
  button.addEventListener("click",handleAcceptingEventRequest)
})


function handleRejectingEventRequest(event){
  const title = event.target.name
  localObj.pendingEvents.filter((events, index) => {
    if (events === title) {
      localObj.pendingEvents.splice(index, 1)
      return
    }
  })
  const localUserToLocalStorage = JSON.stringify(localObj)
  window.localStorage.setItem(localUserEmail, localUserToLocalStorage)
  event.target.parentElement.remove()
}

const rejEventButtons = document.querySelectorAll(".eRej")
rejEventButtons.forEach(button =>{
  button.addEventListener("click",handleRejectingEventRequest)
})

