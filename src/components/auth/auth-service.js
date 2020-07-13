import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';

class AuthService {
    constructor() {
        let service = axios.create({
            baseURL: 'https://rework-project.herokuapp.com/api',
            withCredentials: true
        });
        this.service = service;
    }

    signup = (username, password, firstName, lastName, email) => {
        return this.service.post('/signup', { username, password, firstName, lastName, email })
            .then((response) => {
                return response.data;
            });
    }

    loggedin = () => {
        return this.service.get('/loggedin')
            .then((response) => {
                return response.data;
            });
    }

    logout = () => {
        return this.service.post('/logout')
            .then((response) => {
                return response.data;
            });
    }

    login = (username, password) => {
        return this.service.post('/login', { username, password })
            .then(response => response.data)
            .catch((err) => {
                console.log(err)
            })
    }
}

export default AuthService;