export const Messages = ({messages}) => {
    return (
        <>
            {messages && messages.map((msg,index)=>(
                <div key={index} className={`mb-2 ${msg.type==="join"?"text-center text-gray-500":msg.type==="own"?"text-right":"text-left"}`}>
                    {msg.message}
                </div>
            ))}
        </>
    );
}