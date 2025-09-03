import axios from "../utils/axiosInstance.js";

const user_EndPoint = "api/user"

// User Registration Function
const registerUser = async (userData) => {

    const formData = new FormData()
    formData.append("name", userData.name)
    formData.append("email", userData.email)
    formData.append("password", userData.password)
    formData.append("profilePicture", userData.profilePicture)

    const response = await axios.post(`${user_EndPoint}/register`, formData, {
        headers: {}
    })

    return response.data
}

// User Login Function
const loginUser =async (userData) =>{

    const response = await axios.post(`${user_EndPoint}/login`, userData, {
        headers: {}
    })

    if(response.data && response.data.success && response.data.data){
        localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data
}

// User Logout Function
const logoutUser = async () => {

    const response = await axios.post(`${user_EndPoint}/logout`)

    localStorage.removeItem("user")

    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"


    return response.data
}

// Resfrshing Access Token
const resfreshAccesTokn = async () => {

    const response = await axios.post(`/refresh-Token`)

    if(response.data && response.data.success && response.data.data){
        localStorage.setItem("user", JSON.stringify(response.data.data))
    }

    return response.data
}


export const userService = {
    registerUser,
    loginUser,
    logoutUser,
    resfreshAccesTokn
}