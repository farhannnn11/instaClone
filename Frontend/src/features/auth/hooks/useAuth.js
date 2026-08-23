import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { loginApi,registerApi,getMeApi } from "../services/auth.api";

export const useAuth  = ()=>{
    const context = useContext(AuthContext)
    const {loading,setLoading,user,setUser} = context

   
    const loginHandler  = async (email,password)=>{
       setLoading(true)
        const response  = await loginApi(email,password)
       setUser(response.data)
        setLoading(false)
    }

    const registerHandler = async (username,email,password)=>{
        setLoading(true)
      const response =  await registerApi(username,email,password)
      setUser(response.data)
      setLoading(false)
    }

    const getMeHandler = async()=>{
        setLoading(true)
        const response  = await getMeApi()
        setUser(response.data)
        setLoading(false)
    }

    return{
        user,loading,loginHandler,registerHandler

    }
    

}