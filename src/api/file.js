import axios from "axios";

const API = import.meta.env.VITE_API_URL;

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