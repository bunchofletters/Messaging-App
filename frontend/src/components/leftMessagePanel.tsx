import { useEffect, useState } from "react"
import Friendbox2 from "./friendbox2"
import type { FriendBox2 } from "./friendbox2"

interface roomProp {
    setRoomId: (roomId: string) => void
}

const LeftMessageBox: React.FC<roomProp> = ({setRoomId}) => {

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
                    roomId: friendInfo.roomId,
                })
            )
            updateFriendList(fl);
        }
        getFriend();
    }, [])

    return(
        <>
        {friendList.map(friend => (
            <Friendbox2 displayName={friend.displayName} FriendId={friend.FriendId} roomId={friend.roomId} setRoomId={setRoomId} />
        ))}
        </>
    )
};

export default LeftMessageBox