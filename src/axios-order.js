import axios from 'axios';

const instance = axios.create({
    baseURL :  'https://react-myburger-a947e.firebaseio.com/'
})

export default instance;
