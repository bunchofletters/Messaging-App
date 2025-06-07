
export interface FriendBox {
    displayName: string,
    classType: String
    friendId: string,
    reloadFunc: () => void,
}

const Friendbox: React.FC<FriendBox> = ({displayName, classType, friendId, reloadFunc}) => {

    /**
     * This will remove and decline the friend request
     */
    async function decline_remove(){
        const response = await fetch('http://localhost:8080/friend/handle', {
            method: "DELETE",
            headers: {
                "FE_XP": "react-frontend",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok)
            console.error("Issue removing friend request");
        reloadFunc();
        return;
    }

    /**
     * this will remove and add the friend
     */
    async function accept(){
        const response = await fetch('http://localhost:8080/friend/handle', {
            method: "PUT",
            headers:{
                "FE_XP": "react-frontend",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "FriendId": friendId,
                "displayName": displayName
            }),
            credentials: 'include'
        });

        if(!response.ok)
            console.error("error adding friend");

        reloadFunc();
        return;
    }

    return (
        <div className="flex flex-row justify-between">
        <p>{displayName}</p>
        {classType == "0" &&
                <button 
                    className="flex justify-center items-center text-xs mt-1 mr-1 border rounded-full bg-red-600 w-6 h-6"
                    onClick={decline_remove}
                >x</button>
        }
        {classType == "1" && (
            <div className="flex space-x-1">
                <button 
                    className="flex justify-center items-center text-xs mt-1 mr-1 border rounded-full bg-green-600 w-6 h-6"
                    onClick={accept}
                >
                    <span>&#10003;</span>
                </button>
                <button 
                    className="flex justify-center items-center text-xs mt-1 mr-1 border rounded-full bg-red-600 w-6 h-6"
                    onClick={decline_remove}
                >x</button>
            </div>
        )}
        </div>
    );
};

export default Friendbox;