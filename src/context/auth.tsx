import React, { ReactNode, createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface IContext {
    isAuthenticated: boolean;
    userId: string | null;
    setUserId: Dispatch<SetStateAction<string | null>>
    login: ()=> Promise<void>;
    logout: () => void
}

interface props {
    children: ReactNode;
}

const Auth = createContext({} as IContext)

export function AuthProvider({children}: props){

    const [userId, setUserId] = useState(null)
    const isAuthenticated = !!userId

    async function login (){

    }

    function logout () {

    } 
    
    return (
        <Auth.Provider value={{
            isAuthenticated,
            userId,
            setUserId,
            login,
            logout
        }}>
            {children}
        </Auth.Provider>
    )
}

export function useAuth(){
    return useContext(Auth)
}