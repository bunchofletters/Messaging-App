import { useEffect, useState } from "react"
import Friendbox2 from "./friendbox2"
import type { FriendBox2 } from "./friendbox2"

export default function LeftMessageBox() {

    const [friendList, updateFriendList] = useState<FriendBox2[]>([]);

    useEffect(() => {
        const getFriend = async () => {
            const response = await fetch('http://localhost:8080/friend/getFriend', {
                method: "POST",
                headers: {
                    "FE_XP": "react-frontend",
                    "Content-Type": "text/plain"
                },
                body: "",
                credentials: 'include'
            });
            if (!response.ok){
                console.error("issue acquiring friend list");
                return;
            }
            const friendList_: FriendBox2[] = await response.json();
            let fl: FriendBox2[] = friendList_.map(
                friendInfo => ({
                    FriendId: friendInfo.FriendId,
                    displayName: friendInfo.displayName,
                })
            )
            updateFriendList(fl);
        }
        getFriend();
    }, [])

    return(
        <>
        {friendList.map(friend => (
            <Friendbox2 displayName={friend.displayName} FriendId={friend.FriendId} />
        ))}
        </>
    )
};