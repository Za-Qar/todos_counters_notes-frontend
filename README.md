# React todos-counters-notes with weather api and nasa picture of the day

I read an article saying that in order to learn a new language well, make the same project with the new language to easily see the differences and capabilities of each. I wrote this app over a course of some weeks to practice and explore working with React. Making a todo list is a useful way to learn however, I took it some steps further and added authentication, counters, weather, date & time, nasa picture of the day and movable notes that increase in size when hovering over them. [View project](https://todos-counter-notes.netlify.app/).

To view the todos-counters project I made with vanilla JavaScript please [view it here](https://github.com/Za-Qar/todos_counters-vanilla_JS)

Scheduling and organisation is a core part of our lives so I designed the app to seem like it is a living entity to represent that concept. When you hover over the buttons, they animate in and out as if they are breathing. When a user creates a todo, counter or note, they are encrypted using cryptoJs AES and then sent to the backend where they are encrypted again before being sent to the database. The reason I did this was just to give users peace of mind that their data is being handles securely even though it is not very necessary since the app runs on https which anyways encrypts data. That being said, privacy nowadays is a very important factor so practice in this field is always good. 

The notes in the app can be moved around in a specified area giving the user the freedom to customise and organise their way.

### [View app's API here](https://github.com/Za-Qar/todos_counters_notes-backend)

## Built with

* React
* CSS
* JSX
* Crypto Js encryption
* Firebase
* Weather
* Openweathermap API
* Nasa image of the day API
* Motion API

### Images
![Notes](https://i.imgur.com/uyNBdrc.png)
![Todos](https://i.imgur.com/JY4I9OX.png)
![Counters](https://i.imgur.com/3AzSywq.png)
![Responsive](https://i.imgur.com/QkkhYyN.png)

## View the app

You can either click on the "view project" hyperlink above or 

* clone down the repository
### `git clone https://github.com/Za-Qar/react_todo.git`

* install all the dependencies needed
### `npm i`

* start the app
### `npm run start`

## Contact method

Please don't hesitate in contacting me if you have any questions or need any assistance as I want to hear from you
[Contact email](mailto:za.qa@outlook.com?subject=[GitHub]%20Todos%20Counters%20Notes)
