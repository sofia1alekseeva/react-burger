const BURGER_API = `https://norma.nomoreparties.space/api`;


const checkResponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const request = (path, options) => fetch(`${BURGER_API}/${path}`, options).then(checkResponse);

export const getIngredients = () => request('ingredients');

export const sendOrderIngredients = (ingredientsIds) => request('orders', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "ingredients": ingredientsIds })

});

export const sendRegistrationData = (data) => request('auth/register', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})


export const sendLoginData = (data) => request('auth/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})

export const sendLogoutData = () => request('auth/logout', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
})

export const updateTokenData = () => request('auth/token', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({token: localStorage.getItem('refreshToken')})
})

export const getUserData = () => request('auth/user', {
    method: 'GET',
    headers: {
        'authorization': localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
})

export const updateUserData = (data) => request('auth/user', {
    method: 'PATCH',
    headers: {
        'authorization': localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})

export const sendForgotPasswordData = (data) => request('password-reset', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})

export const sendResetPasswordData = (data) => request('password-reset/reset', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
