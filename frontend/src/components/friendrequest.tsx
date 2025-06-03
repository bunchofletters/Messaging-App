import { useState, useEffect } from "react";

import Friendbox from "./friendbox";
import type { FriendBox } from "./friendbox";

function FriendRequest(){
    const [outgoingRequest, setOutGoingRequest] = useState<FriendBox[]>([])
    const [incomingRequest, setIncomingRequest] = useState<FriendBox[]>([])

    useEffect(() => {
        // const fetchFriendRequest = async () => {
            
        // }
        const test: FriendBox[] = [
            {
                displayName: 'one',
                classType: "0"
            },
            {
                displayName: 'two',
                classType: "0"
            }
        ];
        setOutGoingRequest(test);
        // const fetchFriendRequest = async () => {
            
        // }
        const test2: FriendBox[] = [
            {
                displayName: 'three',
                classType: "1"
            },
            {
                displayName: 'four',
                classType: "1"
            }
        ];
        setIncomingRequest(test2);
    }, []);

    return  (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <p className="text-s dark:text-gray-400 not-dark:text-[#4a4197] self-center">Responding Pending</p>
                <hr className="dark:text-gray-500 not-dark:text-[wheat]"/>
                <div>
                    {outgoingRequest.map(item => (
                        <Friendbox 
                        key={item.displayName}
                        displayName={item.displayName} 
                        classType={item.classType}/>
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
                        key={item.displayName}
                        displayName={item.displayName} 
                        classType={item.classType}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FriendRequest;