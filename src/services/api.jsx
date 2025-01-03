import axios from "axios";



const publicApiUrl = import.meta.env.VITE_PUBLIC_API_URL;
// Configuration de l'URL de base
const api = axios.create({
    baseURL: publicApiUrl, 
    withCredentials: true,
  });

export default api;
