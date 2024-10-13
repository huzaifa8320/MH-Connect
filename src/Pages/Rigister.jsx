import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { Link } from "react-router-dom";
import Account_bg from '../assets/Account-bg.png'
import Google_logo from '../assets/Google-logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

function Rigister() {

    const { user, setUser } = useContext(UserContext)
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    console.log(user);


    return (
        <div className="border h-screen flex">
            <div className="flex w-[45%] justify-center items-center">
                <img src={Account_bg} alt="" className="w-" />
            </div>
            <div className="flex  border-black w-[55%] justify-center items-center">
                <div className="">
                    <form action="" className="">
                        <h1 className="text-3xl font-bold mb-3 text-center text-[#4462ba]">Register to Join Us ✨</h1>
                        <p className="text-[15px] font-semibold text-center text-[#969294]">⏳ Go Fast Your Friends Or Relatives Are Waiting Fot You</p>
                        <div className="flex flex-col gap-5 my-3">
                            {/* Email  */}
                            <div className={`p-3 border-b-2 border-b-[#c7c1c3]`}>
                                <FontAwesomeIcon icon={faUser} color={`${isFocused ? '#4462ba' : '#969294'}`} />
                                <input type="email" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} autoComplete="email" placeholder="Email" className={`outline-none ms-3 font-semibold text-[#4462ba] ${isFocused && 'placeholder:text-[#4462ba]'}`} />
                            </div>
                            {/* Password */}
                            <div className={`p-3 border-b-2 border-b-[#c7c1c3]`}>
                                <FontAwesomeIcon icon={faLock} color={`${isPasswordFocused ? '#4462ba' : '#969294'}`} />
                                <input type="password" onFocus={() => setIsPasswordFocused(true)} onBlur={() => setIsPasswordFocused(false)} autoComplete="current-password" placeholder="Password" className={`outline-none ms-3 font-semibold text-[#4462ba] ${isPasswordFocused && 'placeholder:text-[#4462ba]'}`} />
                            </div>
                            <button type="button" className="bg-[#7C9AF2] my-5 text-white font-semibold text-[18px] p-2.5 rounded-full">Rigister <FontAwesomeIcon icon={faCaretRight} /></button>
                            <p className="text-center text-[#9B9799] font-semibold">
                                Already Have an Account?
                                <Link to={'/login'} className="text-[#4462BA] hover:underline font-semibold ms-1">Login</Link>
                            </p>
                            <button type="button" className="shadow font-semibold text-[#969294] t bg-gray-100 flex relative justify-center items-center p-2.5 rounded-md">
                                <img src={Google_logo} alt="" className="w-7 absolute start-3"/>
                                Continue with Google
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Rigister