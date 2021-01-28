export const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  appId: `${process.env.REACT_APP_APPID}`,
  //optional
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
};

const url = `${process.env.REACT_APP_DATABASE_URL}`;

//Todos
export const TODO_BACKEND_URLS = { TODOS: `${url}/todos` };

//Counters
export const COUNTERS_BACKEND_URLS = { COUNTERS: `${url}/counters` };

//Notes
export const BACKEND_URLS = { NOTES: `${url}/notes` };
