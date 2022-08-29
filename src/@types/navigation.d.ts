export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: ubdefined
            order: undefined
            cart: undefined
            search: undefined
            product: { 
                productId: string 
            }
            auth: { 
                redirectTo: string
            }
        }
    }
}