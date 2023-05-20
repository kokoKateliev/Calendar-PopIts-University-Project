function clear(){
  window.localStorage.setItem("localUserEmail", "")
  window.localStorage.setItem("localNickname", "") 
}

function callCalendar(user){
  const events = window.localStorage.getItem("events")
  const eventsObj = JSON.parse(events)
  const localUser = user
  //get only user Events
  const userEvents = eventsObj.filter(event =>{
    if(event.participants.includes(localUser)){
      return true
    }
    return false
  })

  const sortedUserEvents = userEvents.sort((ev1, ev2) => (ev1.start > ev2.start) ? 1 : (ev1.start < ev2.start) ? -1 : 0)
  const now = new Date()
  console.log(now.getTime())
  const todaysEvents = sortedUserEvents.filter(event =>{
    const eventStart = new Date(event.start)
    if(eventStart.getTime() >= now.getTime()){
      return true
    }
    return false
  })

  document.getElementById("timeLineEvents").innerHTML = `
    <p class="time-line-text">Time line for today</p>
    <div id="timeLineContainer"></div>
  `
  const timeLContainer = document.getElementById("timeLineContainer")
  for (let i of todaysEvents) { 

    const cell = document.createElement("div")
    cell.className = "timelinecell"
    const titleDiv = document.createElement("h3")
    titleDiv.innerHTML = i.title
    cell.append(titleDiv)
    const list = document.createElement("ul")
    const timeStartDiv = document.createElement("li")
    const stHour = i.start.substr(i.start.length - 5)
    const endHour = i.end.substr(i.end.length - 5)
    const dayAt = i.start.substr(8,2) + "." + i.start.substr(5,2) + "." + i.start.substr(0,4) 
    const dayTo = i.end.substr(8,2) + "." + i.end.substr(5,2) + "." + i.end.substr(0,4) 
    const timeString = "<span>Start at:</span> " + stHour + "<span> on </span>" + dayAt
    const timeEnding = "<span>End at: </span>" + endHour + "<span> on </span>" + dayTo
    timeStartDiv.innerHTML = timeString
    list.append(timeStartDiv)
    const timeEndDiv = document.createElement("li")
    timeEndDiv.innerHTML = timeEnding
    list.append(timeEndDiv)
    cell.append(list)
    const detailsDiv = document.createElement("article")
    detailsDiv.innerHTML = "Details : " + i.details
    cell.append(detailsDiv)
    timeLContainer.appendChild(cell)
  }
  if(timeLContainer.childNodes.length === 0){
    const cell = document.createElement("div")
    cell.className = "empty"
    cell.innerHTML = "There are no upcoming events :("
    timeLContainer.appendChild(cell)
  }

  const friendContainer = document.getElementById("friend-list")
  friendContainer.innerHTML = `
    <h5>Friends:</h5>
  `
  const myEmail = window.localStorage.getItem("localUserEmail")
  const localUserData = window.localStorage.getItem(myEmail)
  const localUserObj = JSON.parse(localUserData)
  const list = document.createElement("ul")
  localUserObj.friends.forEach(friend =>{
    const friendCell = document.createElement("li")
    friendCell.innerHTML = friend
    list.append(friendCell)
  })
  friendContainer.appendChild(list)
  // set date
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
  let listofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const day = document.getElementById("calDay")
  const mth = document.getElementById("calMonth")
  const year = document.getElementById("calYear")
  const nowMth = now.getMonth()
  for(let i = 0; i < 12; i++) {
    const opt = document.createElement("option")
    opt.value = i
    opt.innerHTML = months[i]
    if (i == nowMth) {
      opt.selected = true
    }
    mth.appendChild(opt)
  }
  document.getElementById("calDay").setAttribute("max", listofDays[mth.value])
  year.value = parseInt(now.getFullYear())
  day.value = parseInt(now.getDate())

  function handleDay(){
    const month = document.getElementById("calMonth")
    document.getElementById("calDay").setAttribute("max", listofDays[month.value])
    const tday = document.getElementById("calDay")
    if(tday.value === "29" && !(new Date(year.value, 1, 29).getDate() === 29)) {
      tday.value = 28
    }
  }
  mth.addEventListener("change", handleDay)
  function handleLeapYear(event){
    const leap = new Date(event.target.value, 1, 29).getDate() === 29
    if (leap){
      listofDays[1] = 29
    }
    else{
      listofDays[1] = 28
    }
    handleDay()
  }
  year.addEventListener("change", handleLeapYear)

  const monthlyContainer = document.getElementById("monthGrid")
  const weeklyContainer = document.getElementById("weekGrid")
  const dayContainer = document.getElementById("dayContainer")
  const dayGrid = document.getElementById("dayGrid")
  monthlyContainer.style.display = "none"
  weeklyContainer.style.display = "none"
  dayGrid.style.display = "none"
  dayContainer.style.display = "none"

  function printCalendar(){
    if (document.getElementById('monthly').checked) {
      monthlyContainer.style.display = 'flex'
      weeklyContainer.style.display = 'none'
      dayContainer.style.display = 'none'
      dayGrid.style.display = 'none'
      printMonthEvents()
    } else if(document.getElementById('weekly').checked){
      monthlyContainer.style.display = 'none'
      weeklyContainer.style.display = 'grid'
      dayContainer.style.display = 'none'
      dayGrid.style.display = 'none'
      printWeekEvents()
    } else if(document.getElementById('daily').checked){
      monthlyContainer.style.display = 'none'
      weeklyContainer.style.display = 'none'
      dayContainer.style.display = 'grid'
      dayGrid.style.display = 'grid'
      printDayEvents()
    }
  }
  day.addEventListener("change", printCalendar)
  mth.addEventListener("change", printCalendar)
  year.addEventListener("change", printCalendar)

  function getDayString(pDay, pMonth, pYear){
    const tDay = pDay
    const tMonth = parseInt(pMonth) + 1
    var strTMonth
    var strTDay
    const tYear = pYear
    if(tMonth <= 9){
      strTMonth = "0" + tMonth
    }
    else{
      strTMonth = tMonth
    }
    if(tDay <= 9){
      strTDay = "0" + tDay
    }
    else{
      strTDay = tDay
    }
    return tYear + "-" + strTMonth + "-" + strTDay
  }
  function printDayEvents() {
    dayContainer.innerHTML = ""
    const dayString = getDayString(day.value, mth.value, year.value)

    // chistene na mqstoto
    dayGrid.style.display = "grid"
    dayContainer.style.display = "grid";
    weeklyContainer.style.display = "none"
    monthlyContainer.style.display = "none"

    //daily events
    const todayUserEvents = sortedUserEvents.filter(event => {
      if(event.start.substr(0, 10) === dayString) {
        return true
      }
      return false
    })

    //pattern
    const data = [
      ["01:00", []], ["02:00", []], ["03:00", []], ["04:00", []], ["05:00", []], ["06:00", []], ["07:00", []], ["08:00", []], ["09:00", []],
      ["10:00", []], ["11:00", []], ["12:00", []], ["13:00", []], ["14:00", []], ["15:00", []], ["16:00", []], ["17:00", []], ["18:00", []], 
      ["19:00", []], ["20:00", []], ["21:00", []], ["22:00", []], ["23:00", []], ["24:00", []]
    ]

    // events in pattern
    todayUserEvents.forEach(event => {
      const startTime = event.start.substr(event.start.length - 5)
      const endTime = event.end.substr(event.end.length - 5)
      for(let i = 0; i < 23; i++) {
        let endData = data[i][0].substr(0, 2) - 1
        if(endData <= 9){
          endData = "0" + endData + ":00"
        }
        else{
          endData = endData + ":00"
        }
        if(data[i][0] > startTime && endData < endTime){
          data[i][1].push(event.title)
        }
      }
    })
    for (let i of data) { 
      for (let j of i) {
      let cell = document.createElement("div")
      cell.className = "containerCell"
      if(Array.isArray(j)){
        for(let k of j){
          let cell2 = document.createElement("div")
          cell2.innerHTML = k
          cell2.className = "innerCell"
          cell.append(cell2)
        }
      }
      else {
        let text = document.createElement("span")
        text.innerHTML = j
        cell.append(text)
        cell.className = "cell"

      }
      dayContainer.appendChild(cell)
    }}
  }
  const dailyButton = document.getElementById("daily")
  dailyButton.addEventListener("click", printDayEvents)


  function printWeekEvents(){
    dayContainer.style.display = "none";
    dayGrid.style.display = "none"
    weeklyContainer.style.display = "grid"
    monthlyContainer.style.display = "none"
    weeklyContainer.innerHTML = `
    <div class="head">Hours</div>
    <div id="weekDays">
      <div class="head">Monday</div>
      <div class="head">Tuesday</div>
      <div class="head">Wednesday</div>
      <div class="head">Thursday</div>
      <div class="head">Friday</div>
      <div class="head">Saturday</div>
      <div class="head">Sunday</div>
    </div>
    `

    const today = new Date(getDayString(day.value, mth.value, year.value))
    var weekDay = today.getDay()
    if(weekDay === 0){
      weekDay = 7
    }
    const data = [
      ["01:00", [[],[],[],[],[],[],[]]], ["02:00", [[],[],[],[],[],[],[]]], ["03:00", [[],[],[],[],[],[],[]]], ["04:00", [[],[],[],[],[],[],[]]], ["05:00", [[],[],[],[],[],[],[]]], ["06:00", [[],[],[],[],[],[],[]]], ["07:00", [[],[],[],[],[],[],[]]], ["08:00", [[],[],[],[],[],[],[]]], ["09:00", [[],[],[],[],[],[],[]]],
      ["10:00", [[],[],[],[],[],[],[]]], ["11:00", [[],[],[],[],[],[],[]]], ["12:00", [[],[],[],[],[],[],[]]], ["13:00", [[],[],[],[],[],[],[]]], ["14:00", [[],[],[],[],[],[],[]]], ["15:00", [[],[],[],[],[],[],[]]], ["16:00", [[],[],[],[],[],[],[]]], ["17:00", [[],[],[],[],[],[],[]]], ["18:00", [[],[],[],[],[],[],[]]], 
      ["19:00", [[],[],[],[],[],[],[]]], ["20:00", [[],[],[],[],[],[],[]]], ["21:00", [[],[],[],[],[],[],[]]], ["22:00", [[],[],[],[],[],[],[]]], ["23:00", [[],[],[],[],[],[],[]]], ["24:00", [[],[],[],[],[],[],[]]]
    ]
    const weekDays = []
    for(let i = weekDay - 1; i > 0; i--){

      let yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - i)
      weekDays.push(getDayString(yesterday.getDate(), yesterday.getMonth(),yesterday.getFullYear()))
    }
    for(let i = 0; weekDay + i <= 7; i++){

      let yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() + i)
      weekDays.push(getDayString(yesterday.getDate(), yesterday.getMonth(),yesterday.getFullYear()))
    }


    const weeklyUserEvents = sortedUserEvents.filter(event => {
      if(weekDays.includes(event.start.substr(0, 10))) {
        return true
      }
      return false
    })

    weeklyUserEvents.forEach(event => {
      var thisWeekDay = (new Date(event.start.substr(0, 10))).getDay()
      if(thisWeekDay === 0){
        thisWeekDay = 7
      }
      const startTime = event.start.substr(event.start.length - 5)
      const endTime = event.end.substr(event.end.length - 5)
      for(let i = 0; i < 23; i++) {
        let startData = data[i][0].substr(0, 2) - 1
        if(startData <= 9){
          startData = "0" + startData + ":00"
        }
        else{
          startData = startData + ":00"
        }
        if(data[i][0] > startTime && startData < endTime){
            data[i][1][thisWeekDay - 1].push(event.title)
        }
      }
    })

    for (let i of data) { 
      for (let j of i) {
        let cell = document.createElement("div")
        if(Array.isArray(j)){
          cell.className = "containerWeekCell"
          for(let k of j){
            let cell2 = document.createElement("div")
            for(let p of k){
              let cell3 = document.createElement("div")
              cell3.innerHTML = p
              cell3.className = "innerCell"
              cell2.append(cell3)
            }
            cell.append(cell2)
          }
        }
        else {
          let text = document.createElement("span")
          text.innerHTML = j
          cell.append(text)
          cell.className = "cell"

        }
        weeklyContainer.appendChild(cell)
    }}

  }
  const weekButton = document.getElementById("weekly")
  weekButton.addEventListener("click", printWeekEvents)


  function getMonthString(sMonth){
    const month = parseInt(sMonth)
    return months[month]
  }
  function printMonthEvents(){
    monthlyContainer.style.display = "flex"
    dayContainer.style.display = "none"
    dayGrid.style.display = "none"
    weeklyContainer.style.display = "none"
    
    const today = new Date(getDayString(day.value, mth.value, year.value))
    var weekDay = today.getDay()
    if(weekDay === 0){
      weekDay = 7
    }
    monthlyContainer.innerHTML = `
    <h2 class="monthHeader">${getMonthString(mth.value)}</h2>
    <div id="monthDays">
      <div class="weekHeader">Monday</div>
      <div class="weekHeader">Tuesday</div>
      <div class="weekHeader">Wednesday</div>
      <div class="weekHeader">Thursday</div>
      <div class="weekHeader">Friday</div>
      <div class="weekHeader">Saturday</div>
      <div class="weekHeader">Sunday</div>
    </div>
    `
    const data = [
      ["1", []], ["2", []], ["3", []], ["4", []], ["5", []], ["6", []], ["7", []], ["8", []], ["9", []],
      ["10", []], ["11", []], ["12", []], ["13", []], ["14", []], ["15", []], ["16", []], ["17", []], ["18", []], ["19", []], ["20", []], 
      ["21", []], ["22", []], ["23", []], ["24", []], ["25",[]],["26", []], ["27", []], ["28", []], ["29", []], ["30", []], ["31",[]]
    ]

    const monthlyUserEvents = sortedUserEvents.filter(event => {
      const monthNum = parseInt(event.start.substr(5, 2)) - 1
      const yearNum = event.start.substr(0, 4)
      if(mth.value == monthNum && yearNum == year.value) {
        return true
      }
      return false
    })
    monthlyUserEvents.forEach(event => {
      const startDay = parseInt(event.start.substr(8,2))
      const endDay = parseInt(event.end.substr(8,2))
      
      for(let i = startDay; i <= endDay; i++) {
        data[i - 1][1].push(event.title)
      }
    })
    const container = document.getElementById("monthDays")
    var firstDay = (new Date(parseInt(year.value), parseInt(mth.value), 1)).getDay()
    var lastday = (new Date(parseInt(year.value), parseInt(mth.value) + 1, 0)).getDay()
    if(firstDay === 0){
      firstDay = 7
    }
    if(lastday === 0){
      lastday = 7
    }
    for(let i = 1; i < firstDay;i++){
      data.unshift("nonDay")
    }
    
    for(let i = lastday; i < 7; i++){
      data.push("nonDay")
    }
    const max = listofDays[parseInt(mth.value)]
    for (let i of data) { 
      let fatherCell = document.createElement("div")
      if(i === "nonDay"){
        fatherCell.className = "nonDay"
      }
      else{
        if(i[0] > max && i[0] < 32){  
          continue;
        }
        fatherCell.className = "monthWeekDay"
        for (let j of i) {
          let cell = document.createElement("div")
          if(Array.isArray(j)){
            cell.className = "containerMDayCell"
            for(let k of j){
              let cell2 = document.createElement("div")
              cell2.innerHTML = k
              cell2.className = "innerMDayCell"
              cell.append(cell2)
            }
          }
          else {
            let text = document.createElement("span")
            text.innerHTML = j
            cell.append(text)
            cell.className = "dayCell"

          }
          fatherCell.append(cell)
        }
      }
      container.appendChild(fatherCell)
    }
  }
  const monthButton = document.getElementById("monthly")
  monthButton.addEventListener("click", printMonthEvents)
}

window.onload = () =>{
  const email = window.localStorage.getItem("localUserEmail")
  callCalendar(email)
}

document.getElementById("frEmail").addEventListener("change", event =>{
  // const user = window.localStorage.getItem(event.target.value)
  // const userObj = JSON.parse(user)
  // if(!user){
  //   alert("NQMA TAKUV")
  //   return
  // }
  const myEmail = window.localStorage.getItem("localUserEmail")
  const localUser = window.localStorage.getItem(myEmail)
  const localUserObj = JSON.parse(localUser)
  
  if(localUserObj.friends.includes(event.target.value)){
    callCalendar(event.target.value)
  }
  else{
    alert("The user isn't in your friend list or it's not full. Please try again...")
  }
})


