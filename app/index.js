import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular.js";

//Component
//State
//Lifecycle
//UI

//define component
class App extends React.Component {
  //JSX -> <div>...</div>
  //Babel - what compiles JSX into normal code
  // render() {
  //     return (
  //          return React.createContext(
  //             "div",
  //             null,
  //             "Hello World!"
  //         )
  //     )
  // }

  render() {
    return (
      <div className="container">
        <Popular />
      </div>
    );
  }
}

//use component
ReactDOM.render(
  //React Element;
  //Where to render to the Element to
  <App />,
  document.getElementById("app")
);
