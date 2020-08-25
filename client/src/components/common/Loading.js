import React from "react";
import loading from "../common/loading-prod.gif";

export default () => {
  return (
    <div className="container">
      <img src={loading} alt="Loading..." />;
    </div>
  );
};
