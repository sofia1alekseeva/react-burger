const BURGER_API = `https://norma.nomoreparties.space/api`;


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${BURGER_API}/ingredients`)
        .then(checkReponse)
}