import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.54.46.78:3000' //endereço de IP da máquina
})

export default api