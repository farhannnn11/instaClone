import axios from "axios";
// import { useState } from "react";
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// const [loading, setLoading] = useState(true)
// const [user,setUser] = useState("")

export const loginApi = async (email, password) => {
  const response = await api.post("/api/auth/login", {
    email,
    password,
  });
  return response.data
};

export const registerApi = async (username, email, password) => {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });

  return response.data;
};

export const getMeApi = async () => {
  const response = await api.get("/api/auth/get-me");
  return response.data;
};
