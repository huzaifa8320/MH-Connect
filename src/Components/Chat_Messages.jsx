import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router"
import { db } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/UsersContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MH_Chat_bg from '../assets/MH-Chat-Bg.jpg'




function Chat_Messages({ id }) {
    // const { uid } = useParams()
    const [current_chat, setCurrent_Chat] = useState([])
    const { users_data, setUsers_Data } = useContext(UsersContext)
    console.log('User datas', users_data);
    const [chat_details, setChat_Details] = useState(false)



    // console.log(uid);

    useEffect(() => {
        setChat_Details(false)
        if (users_data) {
            const matchedUser = users_data.find(users_data => users_data.uid == id);
            setCurrent_Chat(matchedUser || 'Not Found');
        }
    }, [users_data, id])
    console.log(current_chat);


    return (
        <div className="border relative border-red-800 w-[55%] h-full">
            {chat_details &&
                <div  className="absolute slide-down px-3 shadow bg-white min-h-60 left-2 top-14 mt-1 rounded-sm w-auto">
                    <div className="bg-[#D2D5DA] mx-auto my-5 w-20 h-20 flex rounded-full">{current_chat.profile_pic? <img src={current_chat.profile_pic} alt="" /> : <FontAwesomeIcon icon={faUser} color="#6f7277a8" className="m-auto"/>}</div>
                    
                    <p>Name : {current_chat.displayName.slice(0,1).toUpperCase() + current_chat.displayName.slice(1)}</p>
                    <p>Email : {current_chat.email}</p>
                    </div>
            }
            {current_chat != 'Not Found' ?
                <div style={{ backgroundImage: `url(${MH_Chat_bg})` }} className={`border border-yellow-600 h-full `}>
                    <div onClick={() => setChat_Details(!chat_details)} className="flex relative cursor-pointer gap-2 items-center p-3 bg-white shadow">{current_chat?.profile_pic ? <img src={current_chat.profile_pic} alt="" /> : <div className="bg-[#D2D5DA] flex rounded-full w-8 h-8"><FontAwesomeIcon icon={faUser} className="m-auto text-[#6f7277a8]" /></div>}
                        <h1 className="">
                            {current_chat?.displayName?.slice(0, 1).toUpperCase() + current_chat?.displayName?.slice(1)}
                        </h1>

                    </div>
                    <div className="">h</div>
                </div>
                : <div className="flex justify-center items-center h-full"><p className="">No Data Found</p></div>}
        </div>
    )
}

export default Chat_Messages