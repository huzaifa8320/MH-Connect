import { useParams } from "react-router"

function Chat_Messages({ id }) {
    const { uid } = useParams()
    return(
        <div className="w-[55%]">

            <h1>{uid}</h1>
        </div>
    )
}

export default Chat_Messages