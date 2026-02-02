import axios from "axios";

const BASE_URL = "https://localhost:7087/api";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


 api.interceptors.request.use((config) => {
     const token = localStorage.getItem("token");

     if (token && config.headers) {
         config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
 }, (error) => {
     return Promise.reject(error);
 });

 api.interceptors.response.use(
     (response) => response,
     (error) => {
         if (error.response?.status === 401){
             console.warn("Токен недійсний, перенаправляємо на логін...");
             localStorage.removeItem("token");
         }
         return Promise.reject(error);
     }
 )