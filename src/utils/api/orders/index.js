import api from "../axiosInstance"

export const sendOrderIngredients = (ingredientsIds) => api.post('/orders', { "ingredients": ingredientsIds }, {
    headers: {
        'authorization': localStorage.getItem('accessToken'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});