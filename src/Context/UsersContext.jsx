import { createContext, useContext, useState } from "react";

export const UsersContext = createContext()

function UsersContextProvider({ children }) {
    
    const [users_data, setUsers_Data] = useState([])

    return(
        <UsersContext.Provider value={{ users_data , setUsers_Data }}>
            {children}
        </UsersContext.Provider>
    )

}


export default UsersContextProvider