import axios from "axios";

const BURGER_API = `https://norma.nomoreparties.space/api`;

const options = {
  baseURL: BURGER_API,
  timeout: 30000
}

const axiosInstance = axios.create(options)

axiosInstance.interceptors.response.use(response => response.data, error => {
  const { response, config } = error
  if (response.status !== 403 && response.data.message !== "jwt expired") {
    return Promise.reject(response.data.message)
  }
  const refreshToken = localStorage.getItem('refreshToken');
  return axios.post('/auth/token', {
    token: refreshToken
  }, { options })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.accessToken)
      localStorage.setItem("refreshToken", response.data.refreshToken)
      return axiosInstance(config)
    })
    .catch(() => {
      return Promise.reject(response.data.message)
    })
})

export default axiosInstance