const BURGER_API = `https://norma.nomoreparties.space/api`;


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredients = () => {
    return fetch(`${BURGER_API}/ingredients`)
        .then(checkReponse)
}

export const sendOrderIngredients = (ingredientsIds) => {
    return fetch(`${BURGER_API}/orders`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": ingredientsIds})
                
        }).then(checkReponse)
    }