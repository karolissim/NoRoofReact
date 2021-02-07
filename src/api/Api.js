import axios from 'axios'
import { SERVER_URL } from '../Constants/Constants'

export const api = axios.create({
    baseURL: SERVER_URL
})  