import {useState} from 'react'

export default function Dropdownbar(){
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSymbol, setisOpenSymbol] = useState(<>&#8744;</>)

    const toggle = () => {
        setIsOpen(!isOpen); //if it's open close it and vice versa
        if(isOpen) //open
            setisOpenSymbol(<>&#8744;</>);
            
        else
            setisOpenSymbol(<>&#8743;</>);
    }

    async function signOut(){
        console.log("signout click");
    }

    async function addFriend(){
        console.log("add friend click");
    }

    return (
        <>
        <div className="absolute inline-block text-right w-full">
            <div className={`transition-all duration-75 ease-in-out overflow-hidden ${isOpen ? 'max-h-50': 'max-h-0'}`}> {/*handles drop down translation change max-h to what feels good later*/}
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
                    <i className="fa-solid fa-circle-user dark:text-white fa-2x -mt-3"></i>
                    <p className='dark: text-white'>Add Friends</p>
                </div>
            </div>
        </div>
            <button
                onClick={toggle}
                className="inline-flex justify-center items-center w-10 bg-blue-500 text-white rounded-b-lg hover:bg-blue-600"
            ><span className=''>{isOpenSymbol}</span></button>
        </div>
        </>
    )
}
