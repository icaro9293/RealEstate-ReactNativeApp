import { createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "./useAppwite";
import { getCurrentUser } from "./appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>; // receberá novos parametros, do tipo Record, primeiro parametro sendo uma string, o segundo sendo uma string ou numero. Retorna uma promise tipo void.
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, loading, refetch } = useAppwrite({
        fn: getCurrentUser,
    })

    // a dupla negação é para o dado 'null' primeiramente é negado para true, e depois para false. Caso tenha um dado será primeiramente negado para false, e depois para true. Basicamente transforma valores 'nulls' e objetos em booleans.
    const isLoggedIn = !!user

    console.log(JSON.stringify(user, null, 2))

    return (
        //o objetivo é que os componentes children tenham acesso aos dados do context provider.
        <GlobalContext.Provider value={{
            isLoggedIn,
            user,
            loading,
            refetch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext)
    if (!context) {
        throw new Error('useGlobalContext deve ser usado dentro do GlobalProvider')
    }
    return context
}

export default GlobalProvider