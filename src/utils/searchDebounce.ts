import { useApi } from "../services/axios"


async function filterProducts(name: string, setState) {
    try {
        const { data } = await useApi.get(`/products-search/${name}`)
        setState(data)
    } catch (err) {
        setState(null)
    }
}

let time = null


export async function searchDebounce(event: any, setProductsSearched: any) {
    clearTimeout(time)

    time = setTimeout(() => {
        filterProducts(event, setProductsSearched)
    }, 1000)

}