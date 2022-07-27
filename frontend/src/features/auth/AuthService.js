
import axios from "axios";

const API_URL = "/api/users/"


//Function to register
const register = async (registerData) => {

    let response = await axios.post(API_URL, registerData);

    return response.data;
};

//Function to login

const login = async (loginData) => {

    let response = await axios.post(API_URL + "login", loginData); 

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
    };

    return response.data;
};

//Function to log out

const logout = () => localStorage.removeItem("user");

export const AuthService = {
    register,
    login,
    logout
}
