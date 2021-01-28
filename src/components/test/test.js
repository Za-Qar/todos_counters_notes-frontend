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

import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";

export default function Test() {
  // Context
  const [user] = useUserContext();

  console.log(user);
  return <></>;
}
