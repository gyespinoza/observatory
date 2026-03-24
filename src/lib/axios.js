import axios from 'axios'

const api = axios.create({
  baseURL: 'https://administracionov.ugb.edu.sv/api'
  //baseURL: 'http://localhost:8000/api'
  
})

export default api