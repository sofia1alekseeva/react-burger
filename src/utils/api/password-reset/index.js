import api from "../axiosInstance"

export const sendForgotPasswordData = (data) => api.post('/password-reset', data)

export const sendResetPasswordData = (data) => api.post('/password-reset/reset', data)
