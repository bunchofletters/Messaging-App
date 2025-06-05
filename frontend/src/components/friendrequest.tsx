import { useState, useEffect } from "react";

import Friendbox from "./friendbox";
import type { FriendBox } from "./friendbox";

function FriendRequest(){
    const [outgoingRequest, setOutGoingRequest] = useState<FriendBox[]>([])
    const [incomingRequest, setIncomingRequest] = useState<FriendBox[]>([])

    useEffect(() => {
        const fetchFriendRequest = async () => {
            const response = await fetch('http://localhost:8080/friend/OutgoingRequest', {
                method: "POST",
                headers: {
                    "FE_XP": "react-frontend"
                },
                credentials: 'include'
            });

            if (!response.ok){
                console.error("error getting outgoing request");
                return;
            }
            const result: FriendBox[] = await response.json();
            //query the result and create a FriendBox object for each
            let outgoingList: FriendBox[] = result.map(friendInfo => ({
                displayName: friendInfo.displayName,
                classType: "0",
                friendId: friendInfo.friendId
            }));

            setOutGoingRequest(outgoingList);
            
        }
        const fetchFriendRequest2 = async () => {
            const response = await fetch('http://localhost:8080/friend/IncomingRequest', {
                method: "POST",
                headers: {
                    "FE_XP": "react-frontend"
                },
                credentials: 'include'
            });

            if(!response.ok){
                console.error("error getting incoming friend request");
                return;
            }

            const result: FriendBox[] = await response.json();
            //query the result and create a FriendBox object for each
            let incomingList = result.map(friendInfo => ({
                displayName: friendInfo.displayName,
                classType: "1",
                friendId: friendInfo.friendId
            }));

            setIncomingRequest(incomingList);

        }
        fetchFriendRequest();
        fetchFriendRequest2();

    }, []);

    return  (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <p className="text-s dark:text-gray-400 not-dark:text-[#4a4197] self-center">Responding Pending</p>
                <hr className="dark:text-gray-500 not-dark:text-[wheat]"/>
                <div>
                    {outgoingRequest.map(item => (
                        <Friendbox 
                        key={item.friendId}
                        displayName={item.displayName} 
                        classType={item.classType}
                        friendId={item.friendId}/>
                    ))}
                </div>
                {/* generate a list of outgoing request */}
            </div>
            <div className="flex flex-col">
                <p className="text-s dark:text-gray-400 not-dark:text-[#4a4197] self-center">Friend Request</p>
                <hr className="dark:text-gray-500 not-dark:text-[wheat]"/>
                {/* generate a list of incoming request */}
                <div>
                    {incomingRequest.map(item => (
                        <Friendbox 
                        key={item.friendId}
                        displayName={item.displayName} 
                        classType={item.classType}
                        friendId={item.friendId}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FriendRequest;