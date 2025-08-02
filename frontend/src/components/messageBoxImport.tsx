import {useEffect, useRef, useState} from "react";

import MessageBox from "./messagebox";
import type { MessageContent } from "./messagebox";

interface Messages{
    messages: MessageContent[]
}

const RightMessageBox: React.FC<Messages> = ({messages}) => {
    
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect( ()=> {
        if(containerRef.current){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
        {/* use a for and make a new message box for each message */}
        {messages.length > 0 ? 
            ( 
                <div ref={containerRef}>
                    {messages.map((messages) => (
                        <MessageBox
                            key={messages.order}
                            displayName={messages.displayName}
                            content={messages.content}
                            side={messages.side}
                            order={messages.order}
                        />
                    ))}
                    {/* <MessageBox displayName="Name" content="content" side="0"/> */}
                </div>
            ) : 
            (
                <div><p>No Message</p></div>
            )
        }
        </>
    )
};

export default RightMessageBox;