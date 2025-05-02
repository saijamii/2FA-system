import axios from "axios";

export default axios.create({
  baseURL: `https://server-2fa.onrender.com/api`,
});
