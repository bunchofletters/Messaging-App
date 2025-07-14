

import MessageBox from "./messagebox";
import type { MessageContent } from "./messagebox";

interface Messages{
    messages: MessageContent[]
}

const RightMessageBox: React.FC<Messages> = ({messages}) => {
    

    return (
        <>
        {/* use a for and make a new message box for each message */}
        {messages.length > 0 ? 
            ( 
                <MessageBox displayName="Name" content="content" side="0"/>
            ) : 
            (
                <div><p>No Message</p></div>
            )
        }
        </>
    )
};

export default RightMessageBox;