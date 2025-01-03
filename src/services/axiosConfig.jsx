import axios from 'axios';


const privateApiUrl = import.meta.env.VITE_PRIVATE_API_URL;

const axiosInstance = axios.create({
  baseURL: privateApiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Intercepteur pour les réponses
axiosInstance.interceptors.response.use(
  (response) => response, // Retourne la réponse si tout va bien
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirection vers la page de connexion si l'utilisateur est non autorisé
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/login'; // Redirige vers la page de connexion
    }
    return Promise.reject(error); // Propager l'erreur pour un traitement supplémentaire si nécessaire
  }
);
export default axiosInstance;
