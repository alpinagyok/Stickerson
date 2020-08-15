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
      <div className="col-12 border border-info rounded p-2">
        <div>
          <img
            className="rounded-circle"
            src={user.avatar.url}
            alt={user.name}
            style={{ width: "25px", marginRight: "5px", float: "left" }}
            title="AAAAA"
          />
          <p>{user.name}</p>
        </div>
        <div>
          {stars}
          <span> {review.heading}</span>
        </div>
        <div>
          <span>Reviewed on {String(review.date).split("T")[0]}</span>
        </div>
        <span>{review.text}</span>
      </div>
    );
  }
}

export default Review;
