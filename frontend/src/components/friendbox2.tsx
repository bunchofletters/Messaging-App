

export interface FriendBox2 {
    displayName: string,
    friendId: string,
}

const Friendbox2: React.FC<FriendBox2> = ({displayName, friendId}) => {
    
    
    return (
        <>
        <p>{displayName}</p>
        </>
    )
}

export default Friendbox2;