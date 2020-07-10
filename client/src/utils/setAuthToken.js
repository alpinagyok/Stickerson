import axios from "axios";

// this is why axios is better than fetch. with fetch we would have had to attach the header manually for each request

const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
