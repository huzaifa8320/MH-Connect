import { faSearchengin } from "@fortawesome/free-brands-svg-icons";
import { faCommentDots, faGlobe, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import bg_chat from '../assets/Chat-bg.jpg'
import Google_logo from '../assets/Google-logo.png'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import Chat_Messages from "../Components/Chat_Messages";


function Home() {

  const { user, setUser } = useContext(UserContext)
  const [chat_list, setChat_List] = useState([])
  const [chat_details, setChat_Details] = useState(null)
  const [currentChat, setCurrentChat] = useState([]);
  console.log(user.isLogin);

  const [activeIcon, setActiveIcon] = useState('chat');
  const [toggle_profile, setToggle_Profile] = useState(false);
  const current_User = auth.currentUser;
  const user_data = async () => {

    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = []

      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // console.log(chat_list);
        users.push(doc.data());
      });
      setChat_List(users)
    }

    catch (error) {
      console.error("Error fetching documents: ", error);
    }

  };

  useEffect(() => {
    user_data(); // Call user_data once when the component mounts
    // console.log(chat_list);

  }, []);



  return (
    <div className='h-screen flex bg-slate-200 border-4 border-yellow-600 pt-10'>
      <div className='absolute top-0 cursor-pointer m-3 flex items-center'>
        <FontAwesomeIcon icon={faGlobe} className='text-[#557ae6] mx-1' />
        <h1 className=' text-black font-semibold'>MH-Connect</h1>
      </div>
      <div className='flex w-full border border-red-800'>
        {/* Side Nav  */}
        <div className='bg-slate-200 text-[#557ae6] text-2xl flex flex-col gap-8 mt-24 px-1'>
          <FontAwesomeIcon icon={faCommentDots} className={`cursor-pointer w-8 ${activeIcon == 'chat' && 'border-s-2  border-blue-700'}`} onClick={() => setActiveIcon('chat')} />
          <FontAwesomeIcon icon={faUser} className={`cursor-pointer w-8 ${activeIcon == 'profile' && 'border-s-2  border-blue-700'}`} onClick={() => setActiveIcon('profile')} />
          <div className="mt-auto mb-5 relative">
            <img src={Google_logo} alt="Profile" className="w-10 cursor-pointer shadow rounded-full" onClick={() => setToggle_Profile(!toggle_profile)} />
            {
              toggle_profile &&
              <div className="w-32 text-[18px] font-semibold cursor-pointer absolute left-12 bottom-0">
                <div className="border hover:bg-[#557ae6] shadow hover:text-white flex justify-center rounded items-center">LogOut</div>
              </div>
            }
          </div>
        </div>

        {/* Chat List  */}
        <div className='w-full sm:w-[45%] bg-white border-e-2 px-5'>
          <div className="">
            <h1 className='my-6 font-semibold text-2xl'>Chats</h1>
            <div className='flex border rounded-md p-3 items-center border-slate-300'>
              <input type="text" className='w-full outline-none placeholder:text-slate-400 font-semibold' placeholder='Search Chats' />
              <FontAwesomeIcon icon={faSearchengin} className='text-slate-600 text-2xl cursor-pointer' />
            </div>
          </div>
          {/* Chats  */}
          <div className="border my-3 max-h-[300px]  overflow-y-scroll">
            {chat_list.map((user, index) => (
              <Link to={`/chat/${user.uid}`} onClick={()=>setChat_Details(true)} key={user.uid} className="flex cursor-pointer items-center p-3 gap-3 border">
                <div>{user?.profile_pic ? <img src={user.profile_pic} alt="" /> : <div className="border rounded-full flex w-8 h-8 bg-[#D2D5DA]"><FontAwesomeIcon icon={faUser} className="m-auto text-[#6f7277a8]"/></div>}</div>
                <p>{user.displayName}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Chat Message  */}
        {chat_details ? <Chat_Messages/> :
        <div className='hidden bg-white w-[55%] sm:flex justify-center items-center'>
          <img src={bg_chat} alt="" className='bg-cover object-contain w-[500px] h-[500px]' />
        </div>
        }

        {/* Account  */}
        {user.isLogin ?
          <div className='absolute top-0 right-0 cursor-pointer m-3 flex items-center'>
            <p>Already</p>
          </div> :
          <div className='absolute top-0 right-0 cursor-pointer m-3 flex items-center'>
            <Link to={'/login'}>Login</Link>
          </div>
        }
      </div>
    </div>
  )
}


export default Home