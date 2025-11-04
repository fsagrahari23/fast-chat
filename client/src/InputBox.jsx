export const InputBox = ({message,setMessage}) => {
    const onChangeHandler = (e) => {
        setMessage(e.target.value);
    }
    return (
        <div className="mt-auto pt-3 absolute bottom-0  w-8/9">
            <input 
                type="text" 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500" 
                placeholder="Type your message..."
                value={message}
                onChange={onChangeHandler}
            />
            
        </div>
    );
}