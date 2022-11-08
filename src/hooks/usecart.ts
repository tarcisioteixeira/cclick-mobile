import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface ICart {
    id: string;
    unity: string;
    qty: number;
    name: string;
    price: number;
    avatarUrl: string;
}

type IAction = "increase" | "decrease" | "replace"

export function useCart() {

    const [cartItems, setCartItems] = useState<ICart[]>(null)
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {

        (async () => {
            const cart = await AsyncStorage.getItem('@cart')
            setCartItems(JSON.parse(cart) ?? [])
        })()

    }, [refetch])

    const addToCart = (data: ICart) => {

        let productAlreadyExists = cartItems.find(product => product.id == data.id)

        if (productAlreadyExists) {
            const newCart = cartItems.map(cart => {
                if (cart.id == data.id) {
                    return data
                }

                return cart
            })

            AsyncStorage.setItem('@cart', JSON.stringify(newCart))
            return
        }

        const newCart = [...cartItems, data]
        AsyncStorage.setItem('@cart', JSON.stringify(newCart))

    }

    const updateCart = (data: ICart, action: IAction) => {
        const productExists = cartItems.find(cart => cart.id == data.id)
        if (!productExists) {
            return
        }

        if (action == "replace") {
            const newCart = cartItems.map(cart => {
                if (cart.id == data.id) {
                    return data
                }

                return cart
            })

            AsyncStorage.setItem('@cart', JSON.stringify(newCart))
            setRefetch(!refetch)
            return
        }

        if (action == "increase") {

            const cartApart = cartItems.filter(cart => cart.id != productExists.id)
            productExists.qty = productExists.qty + 1
            AsyncStorage.setItem('@cart', JSON.stringify([...cartApart, productExists]))
            setRefetch(!refetch)
            return

        }

        if (action == "decrease") {
            if (productExists.qty > 1) {

                const cartApart = cartItems.filter(cart => cart.id != productExists.id)
                productExists.qty = productExists.qty - 1
                AsyncStorage.setItem('@cart', JSON.stringify([...cartApart, productExists]))
                setRefetch(!refetch)
                return
            }

            return
        }



    }

    const removeFromCart = (id: string) => {
        const productExists = cartItems.find(cart => cart.id == id)
        if (!productExists) {
            return
        }

        const newCart = cartItems.filter(cart => cart.id != id)
        AsyncStorage.setItem('@cart', JSON.stringify(newCart))

        setRefetch(!refetch)
    }


    return {
        cartItems,
        setCartItems,
        addToCart,
        updateCart,
        removeFromCart
    }
}