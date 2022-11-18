import axios from "axios"

export const base_url = process.env.NEXT_PUBLIC_CCLICK_API || "http://192.168.100.27:5000"

export const useApi = axios.create({
    baseURL: base_url
})

