import { useContext } from "react"
import { UserContext } from "../Context/UserContext"

function SignUp() {

const { user , setUser } = useContext(UserContext)
console.log(user);


    return(
        <div className="border h-screen flex items-center justify-center ">
            <div className="border flex flex-col gap-5 border-black bg-amber-400 w-52">
                <form action="">
                <h1>SignUp</h1>
                <input type="email" autoComplete="email" placeholder="Email" />
                <input type="password" autoComplete="current-password" placeholder="Password" />
                </form>
            </div>
        </div>
    )
}

export default SignUp