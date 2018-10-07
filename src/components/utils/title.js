import React, { Component } from "react";

class Title extends Component {
  render() {
    return (
      <div id="title">
        <h1 id="torTitle">
          <strong>T</strong>
          <span className="restOfTitle">ournament</span>
        </h1>
        <h1 id="braTitle">
          <strong>B</strong>
          <span className="restOfTitle">racket</span>
        </h1>
        <h1 id="genTitle">
          <strong>G</strong>
          <span className="restOfTitle">enerator</span>
        </h1>
      </div>
    );
  }
}

export default Title;
