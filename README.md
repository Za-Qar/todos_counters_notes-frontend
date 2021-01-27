# React todos-counters-notes with weather api and nasa picture of the day

I wrote this app over a course of some weeks to practice and explore working with React. Making a todo list is a useful way to learn however, I took it some steps further and added authentication, counters, weather, date & time, nasa picture of the day and movable notes that increase in size when hovering over them. [View project](https://todos-counter-notes.netlify.app/).

Scheduling and organisation is a core part of our lives so I designed the app to seem like it is a living entity to represent that concept. When you hover over the buttons, they animate on and out as if they are breathing. When a user creates a todo, counter or note, they are encrypted using cryptoJs AES and then sent to the backend were they are encrypted again before being sent to the database. The reason I did this was just to give users peace of mind that their data is being handles secturely even though it is not very necessary since the app runs on https which anyways encrpyts data. And again, it was also for practice because privacy nowadays is a very important factor.

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

## View the app

You can either click on the "view project" hyperlink above or 

* clone down the repository
### `git clone https://github.com/Za-Qar/react_todo.git`

* install all the dependencies needed
### `npm i`

* start the app
### `npm run start

Please don't hesitate in contacting me if you have any queions or need ay assistance as I want to hear from you
[Contact email](mailto: za.qa@outlook.com?subject=[GitHub]%20Todo%20Counter%20Notes).
