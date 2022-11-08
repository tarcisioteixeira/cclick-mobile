export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined
            order: {
                total: number
            }
            cart: undefined
            search: undefined
            favorites: undefined
            product: { 
                productId: string 
            }
            auth: { 
                redirectTo: string
            }
        }
    }
}