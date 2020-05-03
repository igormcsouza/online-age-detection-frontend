import axios from 'axios'

const api = axios.create({baseURL: 'https://online-age-detection.herokuapp.com/'})

export default api