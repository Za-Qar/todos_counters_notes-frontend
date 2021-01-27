export const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  appId: `${process.env.REACT_APP_APPID}`,
  //optional
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
};
