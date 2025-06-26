import React from "react";

export interface MessageContent {
    displayName: string,
    content: string,
    side: string // use to to identify if it's from the user or friend 0 for user and 1 for friend
}

const MessageBox: React.FC<MessageContent> = ({displayName, content, side}) => {
    return(
        <>
        <p>{displayName}</p>
        <p>{content}</p>
        </>
    )
};

export default MessageBox;