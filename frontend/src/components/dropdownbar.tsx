import {useCallback, useState} from 'react'
import AddFriendMenu from './addfriend';
import { debounce } from '../utility/debounce';

export default function Dropdownbar(){
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSymbol, setisOpenSymbol] = useState(<>&#8744;</>)
    const [friendMenu, setFriendMenu] = useState(false);

    const [inlineCss, setInlineCss] = useState("absolute inline-block text-right right-0 w-[40px]")

    /**
     * This debounce is for the drop down bar | on close this debounce will resize the drop down bar button to be only the size of the "clickable" so it doesn't interfer with other UI elements
     * This will call {@link changeInLineCSS}
     */
    const debounceInLineCSS = useCallback(
        debounce(() => {
            changeInLineCSS();
        }, 75), []);

    /**
     * This changes the dropdown CSS
     */
    function changeInLineCSS(){
        setInlineCss("absolute inline-block text-right right-0 w-[40px]");
    }

    /**
     * This is the function that handles opening and closing the dropdown menu
     */
    const toggle = () => {
        setIsOpen(!isOpen); //if it's open close it and vice versa
        if(isOpen){ //open
            setisOpenSymbol(<>&#8744;</>);
        }
        else{
            setisOpenSymbol(<>&#8743;</>);
            setInlineCss("absolute inline-block text-right w-full")
        }
    }

    //TODO
    /**
     * Remove the cookies and send them back to the landing page
     */
    async function signOut(){
        console.log("signout click");
    }

    /**
     * Set addFriendMenu to true which allows the addfriend.tsx to be displayed 
     * @see {@link AddFriendMenu}
     */
    const addFriend = () => {
        setFriendMenu(true);
    }

    /**
     * Set addFriendMenu to false which hides addfriend.tsx
     * @see {@link AddFriendMenu}
     */
    const closePopUp = () => {
        setFriendMenu(false);
    }

    /**
     * show the user profile information
     * user_id [used for being added as friend]
     * display name
     * password [censor this]
     * username [censor this]
     */
    async function checkProfile(){
        console.log("profile clicked");
    }



    return (
        <>
        <div className={inlineCss}>
            <div 
                className={`transition-all duration-75 ease-in-out overflow-hidden ${isOpen ? 'max-h-50': 'max-h-0'}`}
                onTransitionEnd={() => {
                    if(!isOpen)
                        debounceInLineCSS();
                }}
            > {/*handles drop down translation change max-h to what feels good later*/}
            <div className="pt-3 border-2 border-blue-500 bg-blue-500 flex flex-row-reverse justify-left items-center gap-3"
            tabIndex={0}>
                <div className='flex flex-col justify-center items-center border border-transparent hover:rounded hover:border-white -mt-3'
                tabIndex={0}
                onClick={signOut}
                style={{padding: '1rem 0.25rem 0 0.25rem'}}>
                    <i className="fa-solid fa-door-open dark:text-white fa-2x -mt-3 p-0"></i>
                    <p className='dark:text-white'>Sign Out</p>
                </div>
                <div className='flex flex-col justify-center items-center border border-transparent hover:border-white hover:rounded -mt-3'
                onClick={addFriend}
                tabIndex={0}
                style={{padding: '1rem 0.25rem 0 0.25rem'}}>
                    <i className="fa-solid fa-user-group dark:text-white fa-2x -mt-3"></i>
                    <p className='dark: text-white'>Add Friends</p>
                </div>
                <div className='flex flex-col justify-center items-center border border-transparent hover:border-white hover:rounded -mt-3'
                onClick={checkProfile}
                tabIndex={0}
                style={{padding: '1rem 0.25rem 0 0.25rem'}}>
                    <i className="fa-solid fa-circle-user dark:text-white fa-2x -mt-3"></i>
                    <p className='dark: text-white'>Profile</p>
                </div>
            </div>
        </div>
            <button
                onClick={toggle}
                className="inline-flex justify-center items-center w-10 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600"
            ><span className=''>{isOpenSymbol}</span></button>
        </div>
        {/*friend pop up menu */}
        <AddFriendMenu friendPopUp={friendMenu} closePopUp={closePopUp} />
        </>
    )
}
