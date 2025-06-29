import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL:"https://chatappbackend-tc7v.onrender.com/api",
    withCredentials: true,
})