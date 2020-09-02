const baseURL = "http://localhost:3000/api/";

const Endpoints = {
    auth: {
        login: baseURL + "auth/login",
        register: baseURL + "auth/register",
    },
}

export default Endpoints;