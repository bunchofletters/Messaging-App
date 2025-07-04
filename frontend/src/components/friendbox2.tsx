

export interface FriendBox2 {
    displayName: string,
    FriendId: string,
}

const Friendbox2: React.FC<FriendBox2> = ({displayName, FriendId}) => {
    
    
    return (
        <>
        <p>{displayName}</p>
        </>
    )
}

export default Friendbox2;