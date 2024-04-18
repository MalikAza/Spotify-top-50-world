import axios from "axios"
import resetToken from "./spotifyToken"

const tokenError = [400, 401, 403]
const token = sessionStorage.getItem('spotify_token')
const HEADERS = {
    "Authorization": `Bearer ${token}`
  }

const axiosInstance = axios.create({
  headers: HEADERS
})
  
axiosInstance.interceptors.response.use((response) => {
  return response
}, (error) => {
  const originalRequest = error.config

  if (tokenError.includes(error.response?.status) && !originalRequest._retry) {
    originalRequest._retry = true

    return resetToken().then((newToken) => {
      sessionStorage.setItem('spotify_token', newToken)
      originalRequest.headers.Authorization = `Bearer ${token}`

      return axiosInstance(originalRequest)
    })
  }
  return {error, status: error.response?.status}
})

export default axiosInstance