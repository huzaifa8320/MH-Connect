import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import bg_chat from '../assets/Chat-bg.jpg'


function Home() {

    return(
        <div className='h-screen flex bg-slate-200 border-4 border-yellow-600 pt-10'>
        <div className='absolute top-0 cursor-pointer m-3 flex items-center'>
          <FontAwesomeIcon icon={faGlobe} className='text-[#557ae6] mx-1' />
          <h1 className=' text-black font-semibold'>MH-Connect</h1>
        </div>
        <div className='absolute top-0 right-0 cursor-pointer m-3 flex items-center'>
          <Link to={'/login'}>Login</Link>
        </div>
        <div className='flex w-full'>
          {/* Side Nav  */}
          <div className=' bg-slate-200 text-[#557ae6] text-2xl flex flex-col gap-8 px-2'>
            <FontAwesomeIcon icon={faCommentDots} beat className='cursor-pointer' />
            <FontAwesomeIcon icon={faUser} className='cursor-pointer' />
          </div>

          {/* Chat List  */}
          <div className='w-[45%] bg-white border-e-2 px-5'>
            <h1 className='my-6 font-semibold text-2xl'>Chats</h1>
            <div className='flex border rounded-md p-3 items-center border-slate-300'>
              <input type="text" className='w-full outline-none placeholder:text-slate-400 font-semibold' placeholder='Search Chats' />
              <FontAwesomeIcon icon={faSearchengin} className='text-slate-600 text-2xl' />
            </div>
          </div>

          {/* Chat Message  */}
          <div className='bg-white flex p-20'>
            <img src={bg_chat} alt="" className='bg-cover object-contain' />
          </div>
        </div>
      </div>
    )
}


export default Home