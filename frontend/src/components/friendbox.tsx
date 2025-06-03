
export interface FriendBox {
    displayName: string,
    classType: String
}

const Friendbox: React.FC<FriendBox> = ({displayName, classType}) => {

    async function decline_remove(){
        console.log("decline_remove clicked");
    }

    async function accept(){
        console.log("accept clicked");
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