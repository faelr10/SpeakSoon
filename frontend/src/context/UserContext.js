import { createContext } from "react";
import useAuth from "../hooks/useAuth";


//Criar contexto na variavel abaixo
const Context = createContext()


//Função que guarda os métodos do useAuth para poder ser acessado por seus childrens
function UserProvider({ children }) {

    //guardando o método useAuth dentro de um objeto que será usado pelos childrens
    const {register,acess,authenticated,login} = useAuth()

    //retornando Context como um provider, passando no value o método useAuth() que está armazenado dentro do objeto 
    return <Context.Provider value={{register,acess,authenticated,login}}>{children}</Context.Provider>
}


export { Context, UserProvider }