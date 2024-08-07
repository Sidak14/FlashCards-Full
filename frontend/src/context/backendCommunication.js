const API_ENDPOINT = "http://localhost:8800/api"

export const sendPost = async (endpoint, inputs = {}) => {
    console.log(endpoint, inputs);
    return await fetch(API_ENDPOINT + endpoint, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(inputs),
        headers: {
            "Content-Type": "application/json"
        }
    });
};

export const sendGet = async (endpoint) =>{
    return await fetch(API_ENDPOINT + endpoint, {
        method: 'GET',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        }
    });
};

export const sendPut = async (endpoint, inputs={}) =>{
    return await fetch(API_ENDPOINT + endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs)
    });
};

export const sendDelete = async (endpoint) => {
    return await fetch(API_ENDPOINT + endpoint, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        }
    });
};
