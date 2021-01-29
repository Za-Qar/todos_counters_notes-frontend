// import * as React from "react";
// import * as ReactDOM from 'react-dom';
// import Dragula from 'react-dragula';
// export class App extends React.Component {
//   render () {
//     return <div className='container' ref={this.dragulaDecorator}>
//       <div>Swap me around</div>
//       <div>Swap her around</div>
//       <div>Swap him around</div>
//       <div>Swap them around</div>
//       <div>Swap us around</div>
//       <div>Swap things around</div>
//       <div>Swap everything around</div>
//     </div>;
//   }
// };

// var React = require("react");
// var dragula = require("react-dragula");
// var Test = React.createClass({
//   render: function () {
//     return (
//       <div className="container">
//         <div>Swap me around</div>
//         <div>Swap her around</div>
//         <div>Swap him around</div>
//         <div>Swap them around</div>
//         <div>Swap us around</div>
//         <div>Swap things around</div>
//         <div>Swap everything around</div>
//       </div>
//     );
//   },
//   componentDidMount: function () {
//     var container = React.findDOMNode(this);
//     dragula([container]);
//   },
// });
// React.render(<Test />, document.getElementById("examples"));

// export default Test;

import React, { useState } from "react";

// userContext
import { useUserContext } from "../../context/userContext.js";

// userContext
import { useAuthContext } from "../../context/authContext.js";

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

export default function Test() {
  // Context
  const [user] = useUserContext();

  //auth
  const [userData] = useAuthContext();

  // navigator.geolocation.getCurrentPosition(function (position) {
  //   console.log("this is position :", position);
  //   console.log("Latitude is :", position.coords.latitude);
  //   console.log("Longitude is :", position.coords.longitude);
  // });

  // function componentDidMount() {
  //   window.navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       console.log(position);
  //     },
  //     function (error) {
  //       console.error("Error Code = " + error.code + " - " + error.message);
  //     }
  //   );
  // }
  // componentDidMount();

  const successfulLookup = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=256a51c0238f4a5bb8e2c76ebced9e2c
   `)
      .then((res) => res.json())
      .then(console.log);
  };

  navigator.geolocation.getCurrentPosition(successfulLookup, console.log);

  console.log("this is userData: ", userData);

  return (
    <>
      {/* <IfFirebaseAuthedAnd
        filter={({ providerId }) => providerId !== "anonymous"}
      >
        {({ user }) => {
          console.log("email log: ", user?.email);
          console.log(user?.email);
        }}
      </IfFirebaseAuthedAnd> */}
    </>
  );
}
