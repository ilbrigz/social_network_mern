import axios from "axios";

const setDefaultHeader = token => {
  if (token) {
    // Apply to every request
    delete axios.defaults.headers.common["payload-verification-id"];
    axios.defaults.headers.common["payload-verification-id"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["payload-verification-id"];
  }
};

export default setDefaultHeader;
