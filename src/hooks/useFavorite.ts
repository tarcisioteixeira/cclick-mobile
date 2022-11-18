import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

interface IFavorites {
    id: string;
    name: string;
    price: number;
    avatarUrl: string;
}

export function useFavorite() {

    const [favoriteItems, setFavoriteItems] = useState<IFavorites[]>([])
    const [refetch, setRefetch] = useState(false)

    useEffect(()=> {
        (async()=> {
            const favorites = await AsyncStorage.getItem('@favorites')

            setFavoriteItems(JSON.parse(favorites) ?? [])
        })()
    },[refetch])

    const addToFavorites = (data: IFavorites) => {
        const alreadyInFavorites = favoriteItems.find(favorite => favorite.id == data.id)

        if (alreadyInFavorites) {
            const newFavorites = favoriteItems.map(favorite => {
                if (favorite.id == data.id) {
                    return data
                }

                return favorite
            })


            AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
            setRefetch(true)
            return
        }

        const newFavorites = [...favoriteItems, data]
        AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites))
        setRefetch(true)
    }

    const removeFromFavorites = (id: string) => {
        const newFavorites = favoriteItems.filter(favorite => favorite.id != id)
        AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites))
        setRefetch(!refetch)
    }


    return {
        addToFavorites,
        removeFromFavorites,
        favoriteItems
    }
}