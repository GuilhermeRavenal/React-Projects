import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL DA API: /movie/now_playing?api_key=f6fead2fc83afe96562baf9f9012b80c

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api;