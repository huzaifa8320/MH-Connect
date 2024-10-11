import { useContext } from "react"
import { UserContext } from "../Context/UserContext"
import { Link } from "react-router-dom";

function Login() {

const { user , setUser } = useContext(UserContext)
console.log(user);


    return(
        <div className="border h-screen flex items-center justify-center ">
            <div className="border flex flex-col gap-5 border-black bg-amber-400 w-52">
                <form action="">

                <h1>Login</h1>
                <input type="email" autoComplete="email" placeholder="Email" />
                <input type="password" autoComplete="current-password" placeholder="Password" />
                <Link to={'/signup'}>SignUp</Link>
                </form>
            </div>
        </div>
    )
}

export default Login