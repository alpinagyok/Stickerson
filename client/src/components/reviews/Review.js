import React, { Component } from "react";

class Review extends Component {
  render() {
    const { review } = this.props;
    const { user } = review;

    let stars = [];
    let i = 0;
    while (i < review.stars) {
      stars.push(<i className="fas fa-star" key={i} />);
      i++;
    }
    while (i < 5) {
      stars.push(<i className="far fa-star" key={i} />);
      i++;
    }

    return (
      <div className="col-12">
        <hr />
        <div>
          <img
            className="rounded-circle border"
            src={user.avatar.url}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px", float: "left" }}
            title="AAAAA"
          />
          <p className="mb-1">{user.name}</p>
        </div>
        <div>
          {stars}
          <span className="lead"> {review.heading}</span>
        </div>
        <div className="mb-1">
          <span>
            <small>Reviewed on {String(review.date).split("T")[0]}</small>
          </span>
        </div>
        <span>{review.text}</span>
      </div>
    );
  }
}

export default Review;
