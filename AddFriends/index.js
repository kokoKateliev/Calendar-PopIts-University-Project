// import { app } from "../index.js"
// import { getDatabase } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
// const db = getDatabase(app);
// const createPath = "accounts"
// console.log(createPath)
// const dbRef = ref(db, createPath)
// function handleRTDBAddingFriend(event){
//   event.preventDefault()
//   const email =  document.getElementById("email").value
//   const localUser = window.localStorage.getItem("localUserEmail")
//   if(email !== localUser){
//     // // // get User from RTDB and update its data
//     // onValue(dbRef, (snapshot) => {
//     //   snapshot.forEach((childSnapshot) => {
//     //     const childKey= childSnapshot.key;
//     //     const childData = childSnapshot.val();     
//     //     if(childData.email === email){
//     //       const usersRef = ref.child("accounts");
//     //       const accountRef = usersRef.child(childKey);
//     //       const tempList = [...childData.pending]
//     //       tempList.push(email)
//     //       // console.log(childData.pending)
//     //       // accountRef.update({
//     //       //   'pending': tempList
//     //       // })
//     //     }
//     //   });
//     // }, {
//     //   onlyOnce: true
//     // });
//   }
// }


function clear(){
  window.localStorage.setItem("localUserEmail", "")
  window.localStorage.setItem("localNickname", "") 
}

function handleAddingFriend(event) {
  event.preventDefault()
  const email =  document.getElementById("email").value
  if(!email){                                                         // prazni zaqvki
    return
  }
  const localUser = window.localStorage.getItem("localUserEmail")
  if(email !== localUser) {                                           // ako izprastash na sebe si
    const pendingUserProfile = localStorage.getItem(email)
    if(pendingUserProfile){                                           // ako go ima tozi profil   else MESSAGE ako go nqma
      const pedningProfile = JSON.parse(pendingUserProfile)
      if(!pedningProfile.pendingFriends.includes(localUser) && !pedningProfile.friends.includes(email)) {// else MESSAGE ako veche sme pratili pokana ili sme priqteli
        pedningProfile.pendingFriends.push(localUser)
        const pendingUserToLocalStorage = JSON.stringify(pedningProfile)
        localStorage.setItem(email, pendingUserToLocalStorage)
      }
    }
  }
}
const submintButton = document.getElementById("btn-addFriend")
submintButton.addEventListener("click", handleAddingFriend)

const friendContainer = document.getElementById("friend-list")
  friendContainer.innerHTML = `
    <h1>Friends:</h1>
  `
  const myEmail = window.localStorage.getItem("localUserEmail")
  const localUserData = window.localStorage.getItem(myEmail)
  const localUserObj = JSON.parse(localUserData)
  const list = document.createElement("ol")
  localUserObj.friends.forEach(friend =>{
    const friendCell = document.createElement("li")
    friendCell.innerHTML = friend
    list.append(friendCell)
  })
  friendContainer.appendChild(list)

  // ------------------------

  const localUserEmail = window.localStorage.getItem("localUserEmail")
  const localUser = window.localStorage.getItem(localUserEmail)
  const localObj = JSON.parse(localUser)
  const eventListContainer = document.getElementById("event-list")
  const eventLocalStorage = window.localStorage.getItem("events")
  const eventsObj = JSON.parse(eventLocalStorage)

  const userEvents = eventsObj.filter(event =>{
    if(event.participants.includes(localUserEmail)){
      return true
    }
    return false
  })
  if(localObj.participating !== null) {
    eventListContainer.innerHTML=""
    userEvents.forEach((event) => {
      let li = document.createElement("li")
      li.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.creator}</p>
        <ul>
          <li>Start at: ${event.start.substr(8,2) + "." + event.start.substr(5,2) + "." + event.start.substr(0,4)} at ${event.start.substr(event.start.length - 5)}</li>
          <li>End on: ${event.end.substr(8,2) + "." + event.end.substr(5,2) + "." + event.end.substr(0,4)} at ${event.end.substr(event.end.length - 5)}</li>
        </ul>
        <article>Details: ${event.details}</article>
        <input type="button" class="button qSelector" id="removeEvent" name="${event.title}" value="remove"/>
      `
      eventListContainer.appendChild(li)
    });
  }

  if(eventListContainer.childNodes.length === 0){
    const cell = document.createElement("div")
    cell.className = "empty"
    cell.innerHTML = "There aren't any events :("
    eventUl.appendChild(cell)
  }
  
  function handleRemoveEvent(event){
    const title = event.target.name
    localObj.participate.filter((events, index) => {
      if (events === title) {
        localObj.pendingEvents.splice(index, 1)
        return
      }
    })
    eventsObj.filter(events => {
      if (events.title === title) {
        events.participants.forEach( (person, i) => {
          if (person === localUserEmail) { 
            events.participants.splice(i, 1)
            return
          }
        })
      }
    })
    const eventsToLocalStorage = JSON.stringify(eventsObj)
    const localUserToLocalStorage = JSON.stringify(localObj)
    window.localStorage.setItem(localUserEmail, localUserToLocalStorage)
    window.localStorage.setItem("events", eventsToLocalStorage)
    event.target.parentElement.remove()
  }
  const buttons = document.querySelectorAll(".qSelector")
  buttons.forEach(button =>{
    button.addEventListener("click",handleRemoveEvent)
  })