import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'content-type': 'application/json'
  }
})
export default api /* can change the name when importing but if it was like --const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
      'content-type': 'application/json'
    }
  })-- we can't change the name
  */
