import Axios from "axios";

const instance = Axios.create({
  baseURL: "https://react-dominos.firebaseio.com/",
});

export default instance;
