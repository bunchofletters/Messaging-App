import {useState} from 'react'
import Dropdownbar from "../components/dropdownbar";
import FriendRequest from "../components/friendrequest";

function OverViewTextRoom() {
    const [friendRequest, setFriendRequest] = useState(false);

    function enableClick(feature: number){
        //set all option to false first
        setFriendRequest(false);

        //use swtich to set the one we want on
        switch (feature){
            case 1:
                setFriendRequest(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
        <Dropdownbar />
        <div className="flex flex-row w-full h-screen dark:text-white not-dark:text-black"> {/* split the div row wise*/}
            <div className="border-1 dark:border-gray-600 flex-1/8 dark:bg-gray-700 not-dark:bg-blue-100 not-dark:border-blue-50">
                <div className="border-1 dark:border-gray-500 not-dark:border-black flex flex-col">
                    <div 
                        className="flex flex-row items-center justify-center gap-1 cursor-pointer"
                        onClick={() => enableClick(1)}
                    >
                        <i className="fa-solid fa-user-group dark:text-white"></i>
                        <p>Friend Request</p>
                    </div>
                    <div 
                        className="flex flex-row items-center justify-center gap-1 cursor-pointer"
                        onClick={() => enableClick(0)}
                    >
                        <i className="fa-solid fa-comment dark:text-white"></i>
                        <p>Messages</p>
                    </div>
                </div>
                <div className='h-full w-full inline-block place-content-end'>
                    <div 
                        className={`transition-all duration-1000 ease-in-out dark:bg-gray-900 not-dark:bg-[#bdd8f3] ${friendRequest ? 'h-full': 'h-0'}`}
                    >
                        <FriendRequest key={Date.now()}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-2/3 dark:bg-gray-800 not-dark:bg-blue-200">
                <div className="flex-3/4">1</div>
                <div className="relative flex justify-center">
                    <input className="border-2 w-[99%] rounded items-center mb-2 p-3 dark:bg-[#242424] not-dark:bg-[#A7C7E7] not-dark:border-[#242424]">
                    </input>
                </div>
            </div>
        </div>
        </>
    )
}

export default OverViewTextRoom;