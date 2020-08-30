import Endpoints from "../config/endpoints.config";
import axios from 'axios';

export default {
    login: ({ email, password }) => {
        return axios.post(Endpoints.auth.login, {
            email,
            password
        });
    }
};