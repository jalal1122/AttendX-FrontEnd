import axios from "axios";

const localLink = "http://localhost:5000";

const productionLink = import.meta.env.VITE_API_URL;
// "https://attendx-backend.vercel.app";

const baseURL = import.meta.env.VITE_NODE_ENV === "production" ? productionLink : localLink;

// Creating axios instance

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    timeout: 30000
});

// Function for refreshing Access Token
const refreshAccessToken = async () => {
    try{
        const response = await axiosInstance.post("/api/user/refresh-token");

        console.log("Refreshing Token", response);
        const user = response.data.data;

        localStorage.setItems("user", JSON.stringify(user));

        return user.accessToken;       
    }catch(error){
        localStorage.removeItem("user")

        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; "
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; "

        window.location.href = "/login";

        return null;
    }
}

// Adding Access Token Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    }
)

// Response Interceptor for handling Errors
axiosInstance.interceptors.response.use(
    (response)=> response,
    async (error)=>{
        if(error.response?.status === 401){
            console.error("Unauthorized! Refreshing Token");

            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(error.config);
            }
        }

        return Promise.reject(error)
    }
      
)

export default axiosInstance;
