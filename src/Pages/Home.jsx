import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import bg_chat from '../assets/Chat-bg.jpg'
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";


function Home() {

  const { user, setUser } = useContext(UserContext)
  console.log(user.isLogin);

  const [activeIcon, setActiveIcon] = useState('chat');

  return (
    <div className='h-screen flex bg-slate-200 border-4 border-yellow-600 pt-10'>
      <div className='absolute top-0 cursor-pointer m-3 flex items-center'>
        <FontAwesomeIcon icon={faGlobe} className='text-[#557ae6] mx-1' />
        <h1 className=' text-black font-semibold'>MH-Connect</h1>
      </div>
      <div className='flex w-full'>
        {/* Side Nav  */}
        <div className=' bg-slate-200 text-[#557ae6] text-2xl flex flex-col gap-8 mt-24 px-1'>
          <FontAwesomeIcon icon={faCommentDots} className={`cursor-pointer w-8 ${activeIcon == 'chat' && 'border-s-2  border-blue-700'}`} onClick={() => setActiveIcon('chat')} />
          <FontAwesomeIcon icon={faUser} className={`cursor-pointer w-8 ${activeIcon == 'profile' && 'border-s-2  border-blue-700'}`} onClick={() => setActiveIcon('profile')} />
        </div>

        {/* Chat List  */}
        <div className='w-full sm:w-[45%] bg-white border-e-2 px-5'>
          <h1 className='my-6 font-semibold text-2xl'>Chats</h1>
          <div className='flex border rounded-md p-3 items-center border-slate-300'>
            <input type="text" className='w-full outline-none placeholder:text-slate-400 font-semibold' placeholder='Search Chats' />
            <FontAwesomeIcon icon={faSearchengin} className='text-slate-600 text-2xl' />
          </div>
        </div>

        {/* Chat Message  */}
        <div className='hidden bg-white w-[55%] sm:flex justify-center items-center'>
          <img src={bg_chat} alt="" className='bg-cover object-contain w-[500px] h-[500px]' />
        </div>

        {/* Account  */}
        {user.isLogin ?
           <div className='absolute top-0 right-0 cursor-pointer m-3 flex items-center'>
            <p>Already</p>
          </div>:
          <div className='absolute top-0 right-0 cursor-pointer m-3 flex items-center'>
            <Link to={'/login'}>Login</Link>
          </div>
        }
      </div>
    </div>
  )
}


export default Home