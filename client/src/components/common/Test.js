import React, { Component, useState, useEffect } from "react";
import ReactCardFlip from "react-card-flip";
import axios from "axios";

class Test extends Component {
  state = {
    selectedFile: null,
  };

  onChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
  };

  // onClickHandler = () => {
  //   const data = new FormData();
  //   data.append("file", this.state.selectedFile);
  //   console.log(data);
  //   axios.post("/api/images", data).then((res) => {
  //     // then print response status
  //     console.log(res);
  //   });
  // };

  onSubmit = () => {
    const formData = new FormData();
    formData.append("image", this.state.selectedFile);
    // formData.append("upload_preset", preset);
    axios
      .put("api/images/user_avatar", formData)
      .then((res) => console.log(res));
  };

  // handleClick = (e) => {
  //   e.preventDefault();
  //   this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  // };

  render() {
    return (
      <div className="container">
        <h1 className="center red-text">React Image Upload</h1>
        <div className="file-field input-field">
          <div className="btn">
            <span>Browse</span>
            <input type="file" name="image" onChange={this.onChange} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>

        <div className="center">
          <button onClick={this.onSubmit} className="btn center">
            upload
          </button>
        </div>
      </div>
    );
  }
}

export default Test;

{
  /* <div>
  <form action="/api/images/upload" method="POST" enctype="multipart/form-data">
    <input
      type="file"
      name="picture"
      accept="application/x-zip-compressed,image/*"
    />
    <input
      class="form-control"
      type="text"
      name="description"
      placeholder="Description or Message"
    />
    <input class="btn btn-primary" type="submit" value="submit" />
  </form>
</div>; */
}
//

// <div onMouseEnter={this.handleClick} onMouseLeave={this.handleClick}>
//   <ReactCardFlip
//     isFlipped={this.state.isFlipped}
//     flipDirection="vertical"
//   >
//     <div>
//       <h1>This is the front of the card.</h1>
//       {/* <button onClick={this.handleClick}>Click to flip</button> */}
//     </div>

//     <div>
//       <h1>This is the back of the card.</h1>
//       {/* <button onClick={this.handleClick}>Click to flip</button> */}
//     </div>
//   </ReactCardFlip>
// </div>
