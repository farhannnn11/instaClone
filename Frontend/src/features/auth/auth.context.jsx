import { createContext } from "react";
import { useState } from "react";
export const AuthContext = createContext()


export const AuthProvider = ({children}) =>{
const [loading,setLoading] = useState(null)
const [user,setUser] = useState("")
return <AuthContext.Provider value={{loading,setLoading,user,setUser}}>
            {children}
        </AuthContext.Provider>

}
