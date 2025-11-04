import { InputBox } from "./InputBox";
import { Messages } from "./Messages";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

export const Chat = () => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {

        const socket = io("http://localhost:8000", {
            path: "/sockets",
        });
        socketRef.current = socket;
        socket.on("connect", () => {
            setConnected(true);
        });

        socket.on("disconnect", () => {
            setConnected(false);
        });

        socket.on("message", (data) => {
            console.log("message received", data);
            setMessages((prevMessages) => [...prevMessages, { type: "other", message: data.message.message }]);
        });

        socket.on("join", (data) => {
            console.log("user joined", data);
            setMessages((prevMessages) => [...prevMessages, { type: "join", message: `${data.sid} joined the chat` }])
        })


    }, []);

    const sendmessage = () => {
        if (message.trim() === "") return;
        setMessages((prevMessages) => [...prevMessages, { type: "own", message }]);
        if (socketRef.current) {
            socketRef.current.emit("message", { message });
        }

        setMessage("");
    }

    return (
        <>
            <h2>status:{connected ? 'connected' : 'disconnected'}</h2>
            {/* show online */}
            <div className="h-[500px] mt-3 flex-col border-2 flex border-gray-300 rounded-lg p-4 overflow-y-scroll">
                <Messages messages={messages} />
                <div className="w-full h-full relative flex gap-2">
                    <InputBox message={message} setMessage={setMessage} />
                    <button onClick={sendmessage} className="absolute w-1/9 ml-4 bottom-0 right-0 bg-blue-500 text-white px-4 py-4 rounded-lg hover:bg-blue-600">
                        Send
                    </button>
                </div>

            </div>
        </>
    );
}