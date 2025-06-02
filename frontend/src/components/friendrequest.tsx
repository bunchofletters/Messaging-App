
function FriendRequest(){

    return  (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <p className="text-s dark:text-gray-400 not-dark:text-[#4a4197] self-center">Responding Pending</p>
                <hr className="dark:text-gray-500 not-dark:text-[wheat]"/>
                <p>test</p>
                {/* generate a list of outgoing request */}
            </div>
            <div className="flex flex-col">
                <p className="text-s dark:text-gray-400 not-dark:text-[#4a4197] self-center">Friend Request</p>
                <hr className="dark:text-gray-500 not-dark:text-[wheat]"/>
                {/* generate a list of incoming request */}
                <p>test</p>
            </div>
        </div>
    )
}

export default FriendRequest;