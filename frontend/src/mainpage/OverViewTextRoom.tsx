import {useState, useRef, useEffect} from 'react'
import Dropdownbar from "../components/dropdownbar";
import FriendRequest from "../components/friendrequest";
import LeftMessageBox from '../components/leftMessagePanel';
import RightMessageBox from '../components/messageBoxImport';
import type { MessageContent } from '../components/messagebox';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';


function OverViewTextRoom() {
    const [friendRequest, setFriendRequest] = useState(false);
    const [message, setMessage] = useState(true);

    const [overflow, setOverFlow] = useState('auto')

    useEffect(() => {
        websocketSetup();
    }, [])

    
    // const [zIndex, setzIndex] = useState(-1);

    function enableClick(feature: number){
        //set all option to false first
        setFriendRequest(false);
        setMessage(false);

        //use swtich to set the one we want on
        switch (feature){
            case 0:
                setMessage(true);
                break;
            case 1:
                setFriendRequest(true);
                break;
            default:
                break;
        }
    }

    // web socket suff
    const stompclient = useRef<Client | null>(null);
    const currentroom = useRef<any>(null);
    const [roomMessage, setRoomMessage] = useState<Map<string, MessageContent[]>>(new Map());
    const [messageCounter, setMessageCounter] = useState(0);
    const [messToSend, setMessToSend] = useState('');


    const [roomId, setRoomId] = useState('')

    const websocketSetup = () => {
        stompclient.current = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws/chat'),
            connectHeaders: {},
            // debug: function(str){
            //     console.log(str);
            // },
            // onConnect: (frame) =>{
            //     console.log("connected: ", frame);
            // },
        });

        stompclient.current.activate();
    }

    const switchRoom = (roomId: string) => {
        if(currentroom.current){
            currentroom.current.unsubscribe();
            console.log("unsubscribing from room");
        }

        currentroom.current = stompclient.current?.subscribe(`/chat/${roomId}`, (messageOutput: any) => {
            const incomingMessage = messageOutput.body;
            setRoomMessage((prevroomMessage) => {
                const rM = new Map(prevroomMessage); //create a copy of the map
                const prevMess = rM.get(roomId) || []; // get the content related to teh room
                rM.set(roomId, [...prevMess, incomingMessage]); //copy old and add new
                setMessageCounter(rM.get(roomId)?.length || 0); // update for message order <can be used as an identifier>
                return rM; //return the updated map
            });
            console.log("updating message");
        })

        setRoomId(roomId);
    }

    const sendMessage = () => {
        if(messToSend && roomId && stompclient.current?.connected) {
            stompclient.current?.publish({
                destination: `/chat/send`,
                body: JSON.stringify({roomId, messToSend})
            });
        }

        setRoomMessage(prev => {
            const updateMessage = new Map(prev);
            const currentMessage = updateMessage.get(roomId) || [];
            const formatMessage: MessageContent = {displayName: dName, content: messToSend, side: '0', order: messageCounter};
            currentMessage.push(formatMessage);
            updateMessage.set(roomId, [...currentMessage]);
            setMessageCounter(updateMessage.get(roomId)?.length || 0); //update for order so the server knows
            return updateMessage;
        });

        // console.log(roomMessage.get(roomId))
    };

// end of web socket stuff

    async function saveMessage(message: string, order: number, server: string) {
        const response = await fetch('http://localhost:8080/message/saveMessage', {
            method: "POST",
            headers: {
                "FE_XP": "react-frontend",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message,
                order: order,
                server: server
            }),
            credentials: 'include'
        });

        if (!response.ok){
            console.error("error saving message to server");
            return 1;
        }
        return 0;
    }

    const [dName, setDName] = useState('');
    //Make a call to get the user displayname at session start
    useEffect(() => {
        const getName = async () => {
            const response = await fetch('http://localhost:8080/account/getUserName', {
                method: "GET",
                headers: {
                    "FE_XP": "react-frontend"
                },
                credentials: 'include'
            });
            
            if(response.ok){
                const name = await response.text();
                setDName(name);              
            } else {
                console.error("issue getting name")
                return false;
            }

        };

        getName();
        
    }, [])



    const submit = async (e: React.KeyboardEvent) => {
        if(e.key === 'Enter'){
            //Make a fetch to the server and save the message
            try{
                if(messToSend !== null && messToSend !== ""){ //trying to not allow sending of empty messages
                    const result = await saveMessage(messToSend, messageCounter, roomId);
                    if (result === 1) {
                        throw Error("issue with saving message");
                    }
                    sendMessage();
                }
            } catch (err){
                console.error("either saveMessage or sendMessage failed to run: ", err)
            }
            setMessToSend('');
        }
    } 

    return (
        <>
        <div className='relative z-100'> {/* This should be the topmost element regardless of anything i believe; can't think of a situation where this wouldn't be*/}
            <Dropdownbar/>
        </div>
        <div className="flex flex-row w-full h-screen dark:text-white not-dark:text-black"> {/* split the div row wise*/}
            <div className="border-1 dark:border-gray-600 flex-1/8 dark:bg-gray-700 not-dark:bg-blue-100 not-dark:border-blue-50">
                <div className="relative border-1 dark:border-gray-500 dark:bg-gray-700 not-dark:border-black not-dark:bg-blue-100 flex flex-col z-1">
                    <div 
                        className="flex flex-row items-center justify-center gap-1 cursor-pointer"
                        onClick={() => enableClick(1)}
                    >
                        <i className="fa-solid fa-user-group dark:text-white"></i>
                        <p>Friend Request</p>
                    </div>
                    <div 
                        className="flex flex-row items-center justify-center gap-1 cursor-pointer"
                        onClick={() => enableClick(0)}
                    >
                        <i className="fa-solid fa-comment dark:text-white"></i>
                        <p>Messages</p>
                    </div>
                </div>
                <div className='relative h-full w-full place-content-end z-0'>
                    <div 
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out dark:bg-gray-900 not-dark:bg-[#bdd8f3] ${friendRequest ? ' translate-y-0 visible': 'h-0 translate-y-[100%] invisible'}`}
                        style={{
                            maxHeight:'calc(100vh - 53px)',
                            overflow: overflow,
                        }}
                        onTransitionStart={()=>setOverFlow('hidden')}
                        onTransitionEnd={()=>setOverFlow('auto')}
                    >
                        <FriendRequest key={Date.now()}/>
                    </div>
                    <div 
                        className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out dark:bg-gray-900 not-dark:bg-[#bdd8f3] ${message ? 'max-h-[94.6%] translate-y-0 visible': `h-0 translate-y-[-100%] invisible`}`}
                        style={{
                            maxHeight:'calc(100vh - 53px)',
                            overflow: overflow,
                        }}
                        onTransitionStart={()=>setOverFlow('hidden')}
                        onTransitionEnd={()=>setOverFlow('auto')}
                    >
                        <LeftMessageBox setRoomId={switchRoom}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-2/3 dark:bg-gray-800 not-dark:bg-blue-200">
                <div className="flex-3/4 overflow-auto">
                    <div className= "mt-5 ml-2">
                        <RightMessageBox messages={roomMessage.get(roomId) || []}/>
                    </div>
                </div>
                <div className="relative flex justify-center">
                    <input 
                        className="border-2 w-[99%] rounded items-center mb-2 p-3 dark:bg-[#242424] not-dark:bg-[#A7C7E7] not-dark:border-[#242424]" 
                        onChange={(e) => {setMessToSend(e.target.value)}}
                        onKeyUp={(e) => {
                            submit(e);
                        }}
                        value={messToSend}
                    >
                    </input>
                </div>
            </div>
        </div>
        </>
    )
}

export default OverViewTextRoom;