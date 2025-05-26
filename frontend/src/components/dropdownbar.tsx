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

    return (
        <>
        <div className="absolute inline-block text-right w-full">
            <div className={`transition-all duration-75 ease-in-out overflow-hidden ${isOpen ? 'max-h-50': 'max-h-0'}`}> {/*handles drop down translation change max-h to what feels good later*/}
            <div className="pt-8 border-2 border-blue-500 bg-blue-500">
                <p className="not-dark:text-gray-800 dark:text-white">Dropdown container content</p>
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
