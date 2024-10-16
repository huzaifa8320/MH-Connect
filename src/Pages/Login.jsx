import { useContext, useState } from "react"
import { UserContext } from "../Context/UserContext"
import { Link } from "react-router-dom";
import Account_bg from '../assets/Account-bg.png'
import Google_logo from '../assets/Google-logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCircleExclamation, faEnvelope, faLock, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

function Login() {

    const { user, setUser } = useContext(UserContext)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error_Alert_Text, setError_Alert_Text] = useState(null);
    const [login_loading, setLogin_Loading] = useState(false);
    // console.log(user);

    const login_handle = () => {
        if (!email) {
            setError_Alert_Text('Please Enter Email')
        }
        else if (!password) {
            setError_Alert_Text('Please Enter Password')
        }
        else {
            setLogin_Loading(true)
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    setLogin_Loading(false)

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    if (errorCode == 'auth/invalid-email') {
                        setError_Alert_Text('Please Enter a Valid Email ✉')
                    }
                    else if (errorCode == 'auth/invalid-credential'){
                        setError_Alert_Text('Account Not Found 🚫')
                    }
                    setLogin_Loading(false)

                });

        }
        setTimeout(() => {
            setError_Alert_Text(null)
        }, 2000);
    }
    const closeWarningAlert = () => {
        setError_Alert_Text(null)
    }


    return (
        <div className="h-screen flex mx-5 md:mx-10 justify-center">
            {error_Alert_Text &&
                <div className="z-10 cursor-pointer alert shadow-2xl p-3 rounded-lg bg-[#FEDA9E] border-l-8 border-[#FEA601] show fixed right-3 top-5">
                    <span className="text-[#DA7F0B]"><FontAwesomeIcon icon={faCircleExclamation} /></span>
                    <span className="px-3 msg text-[#BE9049] font-semibold">{error_Alert_Text}</span>
                    <span onClick={closeWarningAlert} className="text-[#DA7F0B]"><FontAwesomeIcon icon={faXmark} /></span>
                </div>

            }
            <div className="hidden md:flex  w-[50%] justify-center items-center">
                <img src={Account_bg} alt="" className="w-" />
            </div>
            <div className="flex w-full md:w-[50%] justify-center">
                <div className="my-auto">
                    <form className="">
                        <h1 className="text-2xl sm:text-3xl  font-bold mb-3 text-center text-[#4462ba]">👋 | WELCOME BACK</h1>
                        <p className="text-[15px] font-semibold text-center text-[#969294]">⏳ Go Fast Your Friends Or Relatives Are Waiting Fot You</p>
                        <div className="flex flex-col gap-5 my-3">
                            {/* Email  */}
                            <div className={`p-3 border-b-2 border-b-[#c7c1c3]`}>
                                <FontAwesomeIcon icon={faEnvelope} color={`${email ? '#4462ba' : '#969294'}`} />
                                <input type="email" onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="Email" className={`outline-none ms-3 font-semibold text-[#4462ba] ${email && 'placeholder:text-[#4462ba]'}`} />
                            </div>
                            {/* Password */}
                            <div className={`p-3 border-b-2 border-b-[#c7c1c3]`}>
                                <FontAwesomeIcon icon={faLock} color={`${password ? '#4462ba' : '#969294'}`} />
                                <input type="password" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Password" className={`outline-none ms-3 font-semibold text-[#4462ba] ${password && 'placeholder:text-[#4462ba]'}`} />
                            </div>
                            <button type="button" onClick={login_handle} className="bg-[#7C9AF2] my-5 text-white font-semibold text-[18px] p-2.5 rounded-full">Login {login_loading ? <FontAwesomeIcon icon={faSpinner} spinPulse /> :<FontAwesomeIcon icon={faCaretRight} />}</button>
                            <p className="text-center text-[#9B9799] font-semibold">
                                Don't Have an Account?
                                <Link to={'/rigister'} className="text-[#4462BA] hover:underline font-semibold ms-1">Rigister</Link>
                            </p>
                            <button type="submit" className="shadow font-semibold text-[#969294] t bg-gray-100 flex relative justify-center items-center p-2.5 rounded-md">
                                <img src={Google_logo} alt="" className="w-7 absolute start-3" />
                                Continue with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login