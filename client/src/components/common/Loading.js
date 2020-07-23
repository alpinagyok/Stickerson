import React from "react";
import loading from "./loading.gif";

// do I need this?
export default (size) => {
  return (
    <div>
      <img
        src={loading}
        style={{ width: size, margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
