import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";

class Test extends Component {
  state = {
    isFlipped: false,
  };

  handleClick = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  };

  render() {
    return (
      <div onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          flipDirection="vertical"
        >
          <div>
            <h1>This is the front of the card.</h1>
            {/* <button onClick={this.handleClick}>Click to flip</button> */}
          </div>

          <div>
            <h1>This is the back of the card.</h1>
            {/* <button onClick={this.handleClick}>Click to flip</button> */}
          </div>
        </ReactCardFlip>
      </div>
    );
  }
}

export default Test;
