import axios from "axios";

// const API = "http://localhost:5000/api";

 const API = import.meta.env.VITE_API_URL;

export const createFolder = async (name) => {

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);
if (!token) {
  console.log("Token not found");
}
  const res = await axios({
    method: "post",
    url: `${API}/folders`,
    data: { name },
    headers: {
      "Content-Type": "application/json",
      token: token
    }
  });

  return res.data;
};