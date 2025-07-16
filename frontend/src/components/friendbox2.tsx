

export interface FriendBox2 {
    displayName: string,
    FriendId: string,
    roomId: string
    setRoomId?: (roomId: string) => void,
}

const Friendbox2: React.FC<FriendBox2> = ({displayName, FriendId, roomId, setRoomId}) => {
    
    const broadcastId = () => {
        setRoomId?.(roomId);
    }

    return (
        <div className="hover:text-2xl" onClick={broadcastId}>
            <p>{displayName}</p>
        </div>
    )
}

export default Friendbox2;