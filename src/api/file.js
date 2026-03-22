import axios from "axios";

const API = "http://localhost:5000/api";

export const uploadFile = async (file) => {

  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("file", file);

  const res = await axios.post(
    `${API}/files/upload`,
    formData,
    {
      headers: {
        token: token
      }
    }
  );

  return res.data;
};