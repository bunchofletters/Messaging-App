
import Dropdownbar from "../components/dropdownbar";

function OverViewTextRoom() {

    return (
        <>
        <Dropdownbar />
        <div className="flex flex-row w-full h-screen"> {/* split the div row wise*/}
            <div className="border-1 dark:border-gray-600 flex-1/8 dark:bg-gray-700 not-dark:bg-blue-100 not-dark:border-blue-50"></div>
            <div className="flex flex-col flex-2/3 dark:bg-gray-800 not-dark:bg-blue-200">
                <div className="flex-3/4">1</div>
                <div className="relative flex justify-center">
                    <input className="border-2 w-[99%] rounded items-center mb-2 p-3 dark:bg-[#242424] not-dark:bg-[#A7C7E7] not-dark:border-[#242424]">
                    </input>
                </div>
            </div>
        </div>
        </>
    )
}

export default OverViewTextRoom;