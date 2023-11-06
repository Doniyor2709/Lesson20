import axios from "axios";
import { ENDPOINT } from "../constants/constants";

const request = axios.create({
    baseURL: ENDPOINT,
    timeout: 20000
})

export default request;