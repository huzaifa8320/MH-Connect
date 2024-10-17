import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router"
import { db } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/UsersContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Chat_Messages() {
    const { uid } = useParams()
    const [current_chat , setCurrent_Chat] = useState([]) 
    const { users_data, setUsers_Data } = useContext(UsersContext)
    console.log(users_data);
    


console.log(uid);

    useEffect(() => {
        const matchedUser = users_data.find(users_data => users_data.uid === uid);
        setCurrent_Chat(matchedUser);
            }, [ uid ])

    return (
        <div className="w-[55%] p-3">
            <div className="flex gap-2 items-center">{current_chat.profile_pic ?  <img src={current_chat.profile_pic} alt="" /> :<div className="bg-[#D2D5DA] flex rounded-full w-8 h-8"><FontAwesomeIcon icon={faUser} className="m-auto text-[#6f7277a8]"/></div>}
           
            <h1>{current_chat.displayName?.slice(0,1).toUpperCase()}{current_chat.displayName?.slice(1)}</h1>
            </div>
        </div>
    )
}

export default Chat_Messages