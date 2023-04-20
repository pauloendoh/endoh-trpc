import axios from "axios";
// import { parseCookies } from 'nookies'

// PE 1/3 - remover?? por hora..
// Client axios will get the auth token from the browser cookies
const myAxios = axios.create();

myAxios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

// myClientAxios.interceptors.request.use((config) => {
//   const {user: userStr} = parseCookies()

//   if (userStr)
//     config.headers['x-auth-token'] = JSON.parse(userStr).token
//   return config
// })

export default myAxios;
