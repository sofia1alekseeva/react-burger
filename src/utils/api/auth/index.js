import api from "../axiosInstance"

export const sendRegistrationData = (data) => api.post('/auth/register', data);


export const sendLoginData = (data) => api.post('/auth/login', data);

export const sendLogoutData = () => api.post('/auth/logout', { token: localStorage.getItem('refreshToken') });

export const getUserData = () => api.get('/auth/user', {
    headers: {
        'authorization': localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export const updateUserData = (data) => api.patch('/auth/user', data, {
    headers: {
        'authorization': localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})