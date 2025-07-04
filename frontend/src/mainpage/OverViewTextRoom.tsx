import {useState} from 'react'
import Dropdownbar from "../components/dropdownbar";
import FriendRequest from "../components/friendrequest";
import LeftMessageBox from '../components/leftMessagePanel';
import RightMessageBox from '../components/messageBoxImport';

function OverViewTextRoom() {
    const [friendRequest, setFriendRequest] = useState(false);
    const [message, setMessage] = useState(true);

    const [overflow, setOverFlow] = useState('auto')

    
    // const [zIndex, setzIndex] = useState(-1);

    function enableClick(feature: number){
        //set all option to false first
        setFriendRequest(false);
        setMessage(false);

        //use swtich to set the one we want on
        switch (feature){
            case 0:
                setMessage(true);
                break;
            case 1:
                setFriendRequest(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
        <div className='relative z-100'> {/* This should be the topmost element regardless of anything i believe; can't think of a situation where this wouldn't be*/}
            <Dropdownbar/>
        </div>
        <div className="flex flex-row w-full h-screen dark:text-white not-dark:text-black"> {/* split the div row wise*/}
            <div className="border-1 dark:border-gray-600 flex-1/8 dark:bg-gray-700 not-dark:bg-blue-100 not-dark:border-blue-50">
                <div className="relative border-1 dark:border-gray-500 dark:bg-gray-700 not-dark:border-black not-dark:bg-blue-100 flex flex-col z-1">
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
                <div className='relative h-full w-full place-content-end z-0'>
                    <div 
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out dark:bg-gray-900 not-dark:bg-[#bdd8f3] ${friendRequest ? ' translate-y-0 visible': 'h-0 translate-y-[100%] invisible'}`}
                        style={{
                            maxHeight:'calc(100vh - 53px)',
                            overflow: overflow,
                        }}
                        onTransitionStart={()=>setOverFlow('hidden')}
                        onTransitionEnd={()=>setOverFlow('auto')}
                    >
                        <FriendRequest key={Date.now()}/>
                    </div>
                    <div 
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out dark:bg-gray-900 not-dark:bg-[#bdd8f3] ${message ? 'max-h-[94.6%] translate-y-0 visible': `h-0 translate-y-[-100%] invisible`}`}
                        style={{
                            maxHeight:'calc(100vh - 53px)',
                            overflow: overflow,
                        }}
                        onTransitionStart={()=>setOverFlow('hidden')}
                        onTransitionEnd={()=>setOverFlow('auto')}
                    >
                        <LeftMessageBox />
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-2/3 dark:bg-gray-800 not-dark:bg-blue-200">
                <div className="flex-3/4">
                    <div className= "mt-5 ml-2">
                        <RightMessageBox />
                    </div>
                </div>
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