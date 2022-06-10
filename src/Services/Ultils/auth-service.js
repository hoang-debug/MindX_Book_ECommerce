import axios from "axios";
import {HEROKU_API} from '../Constants/index'

const login = async (username, password) => {
  const response = await axios.post(
    `${HEROKU_API}/auth/login`,
    {
      username,
      password,
    }
  );
  console.log(response)
  if (response.data.data.token) {
    localStorage.setItem("access_token", response.data.data.token);
  }
  return response.data;
};
const authService = {
  login,
};

export default authService;
