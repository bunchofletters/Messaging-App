import React from "react";

export interface MessageContent {
    displayName: string,
    content: string,
    side: string, // use to to identify if it's from the user or friend 0 for user and 1 for friend
    order: number
}

const MessageBox: React.FC<MessageContent> = ({displayName, content, side}) => {
    return(
        <>
        <div>
            <div>  {/*display name div */}
                <p>{displayName}</p>
            </div>
            <div> {/*message content div */}
                <p>{content}</p>
            </div>
        </div>
        </>
    )
};

export default MessageBox;