import { createContext, useContext, useState } from "react";

export const UserContext = createContext()

function UserContextProvider({ children }) {
    
    const [user, setUser] = useState({
        isLogin: false,
        userInfo: {}
      })

    return(
        <UserContext.Provider value={{ user , setUser }}>
            {children}
        </UserContext.Provider>
    )

}


export default UserContextProvider