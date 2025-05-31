import {useState} from 'react'


interface FriendPopUpProps{
    friendPopUp: boolean;
    closePopUp: () => void;
}

/**
 * 
 * @param friendPopUp a true or false booelan indicating whatever to show this component or not
 * @param closePopUp a function that should set friendPopUp to false: this function should be written in the class using this component
 */
const AddFriendMenu: React.FC<FriendPopUpProps> = ({friendPopUp, closePopUp}) => {
    if(!friendPopUp) return null;

    const [friendId, setFriendId] = useState("");

    //TODO
    /**
     * 
     * @param event this is just to prevent form reloading
     * @param friendId provided thorugh state
     * Query the Server for a friend of the provided ID in "friendId" if found send a notification
     * to that user, if not do nothing. Close the pop up regardless of result
     */
    const FindFriend = async (event: React.FormEvent) => {
        event.preventDefault();
            try{
            const response = await fetch('http://localhost:8080/friend/add_friend', {
                method: "POST",
                headers: {
                    "FE_XP": "react-frontend",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    "friend_id": friendId
                }),
                credentials: 'include'
            });
            if (!response.ok){
                console.log(await response.text());
                return;
            }
            console.log(await response.text());
        } catch (err){
            console.error(err);
        }
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-1"
            onClick={closePopUp}
        >
            <div
                className="dark:bg-gray-700 dark:border-gray-500 not-dark:bg-amber-50 not-dark:border-amber-50 w-1/2 h-4/5 shadow-lg relative border-1 text-black flex justify-center items-center flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <p className="dark:text-white not-dark:text-black mb-5">Friend ID</p>
                <form className="flex flex-col">
                    <input 
                        className="bg-white border-1 not-dark:border-black dark:border-black w-[100%]"
                        onChange={(e) => setFriendId(e.target.value)}
                    />
                    <button className="border-1 rounded-lg bg-blue-500 mt-5" onClick={FindFriend}>Find Friend</button>
                </form>
            </div>
        </div>
    )
}

export default AddFriendMenu