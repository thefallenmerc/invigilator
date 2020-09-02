const baseURL = "http://localhost:3000/api/";

const Endpoints = {
    auth: {
        login: baseURL + "auth/login",
        register: baseURL + "auth/register",
    },
    cms: {
        test: baseURL + "cms/test",
    },
}

export default Endpoints;