import api from "../axiosInstance"

export const getIngredients = () => api.get('/ingredients');
