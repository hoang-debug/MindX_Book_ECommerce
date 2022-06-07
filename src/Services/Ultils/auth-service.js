import axios from "axios";

const login = async (username, password) => {
  const response = await axios.post(
    `${process.env.REACT_APP_Backend_URI}/api/auth/login`,
    {
      username,
      password,
    }
  );
  console.log(response)
  if (response.data.data.token) {
    localStorage.setItem("token", JSON.stringify(response.data.data));
  }
  return response.data;
};
const authService = {
  login,
};

export default authService;
