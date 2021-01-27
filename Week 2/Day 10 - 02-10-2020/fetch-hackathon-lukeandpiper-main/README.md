# Fetch Hackathon

Today we will be using our new found skills to make apps that request data from a server.

## Step 1 - Getting data and brainstorming (20 - 30 mins)

Here are some APIs that we can use for free. All but the dad jokes one simply need the url. Each api has documentation on how to ask for different data by changing the url. We have included an example fetch for each one to help you get started.

👉 Visit the documentation for the APIs, use JS to request some data and see what you get back. From there, brainstorm what you could make with your knowledge of JavaScript, the DOM and the data you have received.

### Star Wars API

- [Star Wars API](https://swapi.dev/)

```js
// fetch the first star wars character
fetch("https://swapi.dev/api/people/1");
```

### Pokemon API

- [Pokemon API](https://pokeapi.co/)

```js
// fetch the first pokemon
fetch("https://pokeapi.co/api/v2/pokemon/1/");
```

### Trivia API

- [Trivia API](https://opentdb.com/api_config.php)

```js
// fetch 10 random questions
fetch("https://opentdb.com/api.php?amount=10");
```

### Dad Jokes API

- [Dad Jokes API](https://icanhazdadjoke.com/api)

```js
// fetch a dad joke
fetch("https://icanhazdadjoke.com/", {
  headers: { accept: "application/json" },
});
```

## Step 2 - Break down the problem (20 - 30 mins)

Now that you have got an idea of what data you are working with, and have come up with an idea of what you could achieve, break down the problem into smaller chunks. Keep breaking the problem down until you can translate your plan into code. You should dream big, break it down and start small. If your plan turns out to be overly ambitious, then be smart and reign it in. If you have been too conservative then try and push yourself.

## Step 3 - Build (The rest of the day!)

Translate your plan into code, turn your ideas into reality. Enjoy!
# todo
