import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="landing m-lg-5 m-md-3">
          {/* <img src="./img/showcase.jpg" alt=""></img> */}
          <div className="landing-centered">
            <h1 className="font-weight-bold text-light">
              Find you Sticker, Son
            </h1>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="mb-4 mt-4">Shop Products</h3>
              {/* TODO: Products */}
              <hr />
              <Link to="/register" className="btn btn-lg btn-info mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-lg btn-light">
                Login
              </Link>
            </div>
          </div>
        </div>
        {/* <div style={{ height: "800px" }}>ad</div> */}
      </div>
      // <div>
      //   <section>
      //     <div className="container">
      //       <div className="row align-items-center">
      //         <div className="col-lg-6 order-lg-2">
      //           <div className="p-5">
      //             <img
      //               className="img-fluid rounded-circle"
      //               src="img/01.jpg"
      //               alt=""
      //             ></img>
      //           </div>
      //         </div>
      //         <div className="col-lg-6 order-lg-1">
      //           <div className="p-5">
      //             <h2 className="display-4">For those about to rock...</h2>
      //             <p>
      //               Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      //               Quod aliquid, mollitia odio veniam sit iste esse assumenda
      //               amet aperiam exercitationem, ea animi blanditiis recusandae!
      //               Ratione voluptatum molestiae adipisci, beatae obcaecati.
      //             </p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </section>
      // </div>
    );
  }
}

export default Landing;
