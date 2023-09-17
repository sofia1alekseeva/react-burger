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