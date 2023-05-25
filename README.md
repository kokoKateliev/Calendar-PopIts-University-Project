# Popits - Your Daily Calender Adviser 
Front-End-Course-University-Project-2023
https://fmi-popits.firebaseapp.com/ - hosted site
----------------------------------------
The project is similar to Google Maps. Main functionalities are calendar for month, week
and day where events are displayed for the user.Upcoming events for the day are also shown. The
 friends part also allows visiting the calendars of the user's friends.
 A user can create events that are public or private to their calendar. In case of public status, it would be possible for a user to send invitations to their friend list. Friends can accept/reject the invitation - if they accept it, the event will also appear in their calendar. Friend requests can also be accepted or declined.
Each user has the ability to check the calendar of their friends, what events they have coming up. It mainly uses FireBase database for user accounts - email and password, and the rest of the information is kept in localstorage.

Main logic for calendar generator 
    1. Getting how many days are there in the month and for each month max days in array.
    2. Setting for each day of the month - which day of the week it is. (Indexing) 
    3. Generating "blank blocks" to match the days of the week.
    4. Generating HTML blocks and CSS style into DOM.
