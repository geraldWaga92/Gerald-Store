
import axios from "axios"

// this our baseline url instances on which we don't have to write process.env erverytime we use them, but well only use makeReqeust and
//it do thesame thing
export const makeRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_API_TOKEN,
    },
})