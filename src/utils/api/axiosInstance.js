import axios from "axios";

const BURGER_API = `https://norma.nomoreparties.space/api`;

const options = {
  baseURL: BURGER_API,
  timeout: 30000
}

const axiosInstance = axios.create(options)

  axiosInstance.interceptors.response.use(response => response.data, error => {
    const { response, config } = error
  console.log("response", response);
    if (response.status !== 403 && response.data.message !== "jwt expired") {
      return Promise.reject(response.data.message)
    }
    const refreshToken = localStorage.getItem('refreshToken');
    console.log("refreshToken",refreshToken)
    // Use a 'clean' instance of axios without the interceptor to refresh the token. No more infinite refresh loop.
    return axios.post('/auth/token', {
      token: refreshToken
    }, options)
      .then((response) => {
        // If you are using localStorage, update the token and Authorization header here
        console.log("response token", response)
        localStorage.setItem("accessToken", response.data.accessToken)
        localStorage.setItem("refreshToken", response.data.refreshToken)
        return axiosInstance(config)
      })
      .catch(() => {
        return Promise.reject(response.data.message)
      })
  })
  
  export default axiosInstance