const checkResponse = (res) => {
    return res.ok ? res.data : Promise.reject(res);
};

export default checkResponse;