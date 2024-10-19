import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { useParams } from "react-router"
import { auth, db } from "../utils/firebase";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../Context/UsersContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MH_Chat_bg from '../assets/MH-Chat-Bg.jpg'
import EmojiPicker from "emoji-picker-react";




function Chat_Messages({ id }) {
    // const { uid } = useParams()
    const [current_chat, setCurrent_Chat] = useState([])
    const { users_data, setUsers_Data } = useContext(UsersContext)
    console.log('User datas', users_data);
    const [chat_details, setChat_Details] = useState(false)
    const [emoji_show, setEmoji_Show] = useState(false)
    const [inputValue, setInputValue] = useState("");
    const [filteredChats, setFilteredChats] = useState([]);
    const [chats, setChats] = useState([]);
    const current_user_id = auth.currentUser?.uid;
    const another_user_id = id;


    // Unique id generate 
    const generateChatId = (current_user_id, another_user_id) => {
        return [current_user_id, another_user_id].sort().join('_');
    };
    const chatId = generateChatId(current_user_id, another_user_id);

    // Show user chat 
    useEffect(() => {
        if (users_data) {
            const matchedUser = users_data.find(users_data => users_data.uid == id);
            setCurrent_Chat(matchedUser || 'Not Found');
        }
    }, [users_data, id])



    // Emoji Pack 
    const onEmojiClick = (emojiObject) => {
        setInputValue(inputValue + emojiObject.emoji);
        setEmoji_Show(false)
    }

    // Send Message 
    const send_message = async () => {
        let input_trim = inputValue.trim()
        if (inputValue) {
            const message = {
                senderId: current_user_id,
                text: input_trim,
                timestamp: serverTimestamp(),
            };
            const docRef = doc(db, "chats", chatId);
            const chatSnapshot = await getDoc(docRef);

            if (chatSnapshot.exists()) {
                const messagesRef = collection(db, "chats", chatId, "messages");

                try {
                    await addDoc(messagesRef, message);
                    console.log('Message sent successfully');
                } catch (error) {
                    console.error('Error sending message: ', error);
                }
            } else {
                setDoc(chatDocRef, {
                    users: [current_user_id, another_user_id],
                    createdAt: serverTimestamp(),
                }).then(async () => {
                    try {
                        await addDoc(messagesRef, message);
                        console.log('Message sent successfully');
                    } catch (error) {
                        console.error('Error sending message: ', error);
                    }
                    console.log('New chat room created:', chatId);
                }).catch((error) => {
                    console.error('Error creating chat room:', error);
                });



            }
        }
    }


    // Send message to firebase 
    useEffect(() => {

        const messagesRef = collection(db, "chats", chatId, "messages");

        // console.log(chatId);

        // Subscribe to real-time updates
        const unsub = onSnapshot(messagesRef, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push({ id: doc.id, ...doc.data() });
            });
            console.log("Current messages: ", messages);
        }, (error) => {
            console.error("Error fetching messages: ", error);
        });

        // Cleanup function to unsubscribe from the listener
        return () => {
            unsub();
        };

    }, [id])


    // User all Personal Chats 
    useEffect(() => {

        if (current_user_id) {
            console.log('Current User ID:', current_user_id); // Log user ID for debugging

            // Create a query to fetch chat rooms that include the current user's ID
            const chatsRef = collection(db, 'chats');
            const q = query(chatsRef, where('users', 'array-contains', current_user_id));

            // Set up a real-time listener
            const unsubscribeChats = onSnapshot(q, async (querySnapshot) => {
                const fetchedChats = querySnapshot.docs.map(doc => (
                    // setChats(doc.data())
                    console.log('room', doc.data())
                ));
                // Clean up the listener on unmount
                return () => {
                    unsubscribeChats(); // Unsubscribe from chats listener
                };
            })
            //     const chatsWithMessages = await Promise.all(fetchedChats.map(async (chat) => {

            //         // Set up a real-time listener for messages
            //         const unsubscribeMessages = onSnapshot(messagesRef, (messagesSnapshot) => {
            //             const messages = messagesSnapshot.docs.map(messageDoc => ({
            //                 id: messageDoc.id,
            //                 ...messageDoc.data(),
            //             }));

            //             // Update chat with messages
            //             setChats(prevChats => prevChats.map(c =>
            //                 c.id === chat.id ? { ...c, messages } : c
            //             ));
            //         });

            //         return { ...chat, messages: [] }; // Initialize messages to an empty array
            //     }));

            //     // Set initial chats without messages
            //     setChats(chatsWithMessages);
            // });


        }
    }, [current_user_id]);



    // Show chats 
    // useEffect(() => {
    //     // const chatId = generateChatId(current_user_id, another_user_id);
    //     const matchedChats = chats.filter(chat => chat.id === chatId);

    //     setFilteredChats(matchedChats);
    // }, [chats, chatId]);

    // console.log('Match Mess', filteredChats);
    // // console.log('Match Mess',filteredChats);

    return (
        <div className="border relative w-[55%] h-full">
            {chat_details &&
                <div className="absolute slide-down px-3 shadow bg-white min-h-60 left-2 top-14 mt-1 rounded-sm w-auto">
                    <div className="bg-[#D2D5DA] mx-auto my-5 w-20 h-20 flex rounded-full">{current_chat.profile_pic ? <img src={current_chat.profile_pic} alt="" /> : <FontAwesomeIcon icon={faUser} color="#6f7277a8" className="m-auto" />}</div>

                    <p>Name : {current_chat.displayName.slice(0, 1).toUpperCase() + current_chat.displayName.slice(1)}</p>
                    <p>Email : {current_chat.email}</p>
                </div>
            }
            {current_chat != 'Not Found' ?
                <div className={`h-full`}>
                    <div className="bg-[#5579e6a9] h-full">
                        <div onClick={() => setChat_Details(!chat_details)} className="flex absolute w-full mx-auto cursor-pointer gap-2 items-center p-3 bg-white shadow">{current_chat?.profile_pic ? <img src={current_chat.profile_pic} alt="" /> : <div className="bg-[#D2D5DA] flex rounded-full w-8 h-8"><FontAwesomeIcon icon={faUser} className="m-auto text-[#6f7277a8]" /></div>}
                            <h1 className="">
                                {current_chat?.displayName
                                    ? current_chat.displayName.slice(0, 1).toUpperCase() + current_chat.displayName.slice(1)
                                    : "Unknown User"}
                            </h1>


                        </div>
                        <div className="overflow-y-auto flex flex-col pt-14 pb-5 h-full">
                            <div className="mx-3 flex flex-col text-[#5579e6] font-[500] max-w-auto">
                                <p className="mx-auto text-[14px] text-center my-8 bg-gray-200 rounded-md p-3 max-w-60 text-gray-500">Your chat is safeguarded. Only you and your contact can view these messages.</p>
                                <div className="overflow-y-auto flex flex-col py-14 h-full">
                                    <div className="mx-3 flex flex-col text-[#5579e6] font-[500] max-w-auto">
                                        {filteredChats.length > 0 ? (
                                            filteredChats.map((chat) => (
                                                <div className="flex flex-col gap-5" key={chat.id}>
                                                    {chat.messages && chat.messages.length > 0 ? (
                                                        // Sort messages based on the timestamp
                                                        chat.messages
                                                            .slice()
                                                            .sort((a, b) => (a.timestamp?.toMillis() || 0) - (b.timestamp?.toMillis() || 0)) // Sort by timestamp
                                                            .map((message) => (
                                                                <div className={`${message.senderId === current_user_id ? "ml-auto" : "mr-auto"
                                                                    } max-w-[60%] min-w-20 p-2 rounded-md justify-center bg-white flex`} key={message.id}>
                                                                    <p>
                                                                        {message.text} {/* Display the message text */}
                                                                    </p>
                                                                </div>
                                                            ))
                                                    ) : (
                                                        <p>No messages found</p>
                                                    )}
                                                </div>

                                            ))
                                        ) : (
                                            <p>No chats available</p>
                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className="mt-auto  bg-white px-3 absolute bottom-0 w-full flex">
                                {emoji_show &&
                                    <div className="absolute bottom-0">
                                        <EmojiPicker onEmojiClick={onEmojiClick} />
                                    </div>}
                                <button onClick={() => setEmoji_Show(!emoji_show)}>😊</button>
                                <input type="text" onClick={() => setEmoji_Show(false)} onChange={(e) => setInputValue(e.target.value)} value={inputValue} placeholder="Type a message" className="w-full h-10 ps-3 outline-none" />
                                <button onClick={send_message}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                : <div className="flex justify-center items-center h-full"><p className="">No Data Found</p></div>}
        </div>
    )
}

export default Chat_Messages