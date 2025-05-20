import {useState, useCallback, useRef} from 'react'
import {useNavigate} from 'react-router'
import {debounce} from '../utility/debounce.ts'

function RegisterPage(){
    const navigate = useNavigate();
    const accountFoundRef = useRef(false);
    const [username, setUsername] = useState("");
    const [usernameCss, setUsernameCss] = useState("border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
    const usernameRef = useRef(username);
    const [userAvalible, setUserAvalible] = useState(<span className="flex items-center gap-1 mt-2">Username Avaliability:</span>)
    const [displayname, setDisplayname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordDefaultText, setPasswordDefaultText] = useState(<>Password</>)
    const [passwordCSS, setPasswordCSS] = useState("border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white")
    const [conPassword, setConPassword] = useState("");
    const [conpasswordDefaultText, setconPasswordDefaultText] = useState(<>Confirm Password</>)
    const [conPasswordCss, setConPasswordCss] = useState("border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white")

    const [passwordReq1, setPasswordReq1] = useState(<>5-20 Letters Long</>)
    const [passwordReq2, setPasswordReq2] = useState(<>Contains at least 1 Special Symbol</>)
    const [passwordReq3, setPasswordReq3] = useState(<>Contains at least 1 Numbers</>)
    const [passwordReq4, setPasswordReq4] = useState(<>Has a Uppercase and Lowercase Letter</>)

    const [createDisable, setcreateDisable] = useState(false); 

    //create a debounce instance to prevent querying the db too many times
    const debounceCheckUsername = useCallback(
        debounce(() => {
            checkUsernameAvability();
        }, 1000), []);

    async function checkUsernameAvability(){
        if (usernameRef.current === ""){
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/account/user?username=${usernameRef.current}`, {
                method: "GET",
                headers: {
                    "FE_XP": "react-frontend"
                }
            });
            setcreateDisable(false); //re-enable the button
            if (!response.ok){ //no user found
                setUserAvalible(<span className="flex items-center gap-1 mt-2">Username Avaliability: <span className='text-green-600 text-xs'>Username Available</span></span>)
                accountFoundRef.current = false;
                return;
            }

            setUserAvalible(<span className="flex items-center gap-1 mt-2">Username Avaliability: <span className='text-red-600 text-xs'>Username is Already in Use</span></span>)
            accountFoundRef.current = true;

        } catch (err) {
            console.error(err);
        }
    }
    //check if the user password is valid realtime
    function validatePassword(p: string){
        //regex1 -> check string length
        const lengthRegex = /^(?=.{5,20}$)/
        if (!lengthRegex.test(p))
            setPasswordReq1(<>5-20 Letters Long <span className="text-sm text-red-500" aria-label='Does not Meet Requirement'>&#10006;</span></>)
        else
            setPasswordReq1(<>5-20 Letters Long <span className="text-sm text-green-500" aria-label='Requirement Met'>&#10003;</span></>)
        //regex2 -> special symbol check
        const specialSymbolRegex = /^(?=.*[!@#$%^&*()_\-+=?;:|~])/
        if (!specialSymbolRegex.test(p))
            setPasswordReq2(<>Contains at least 1 Special Symbol <span className="text-sm text-red-500" aria-label='Does not Meet Requirement'>&#10006;</span></>)
        else
            setPasswordReq2(<>Contains at least 1 Special Symbol <span className="text-sm text-green-500" aria-label='Requirement Met'>&#10003;</span></>)
        //regex3 -> Number check
        const numberRegex = /^(?=.*\d)/
        if(!numberRegex.test(p))
            setPasswordReq3(<>Contains at least 1 Numbers <span className="text-sm text-red-500" aria-label='Does not Meet Requirement'>&#10006;</span></>)
        else
            setPasswordReq3(<>Contains at least 1 Numbers <span className="text-sm text-green-500" aria-label='Requirement Met'>&#10003;</span></>)
        //regex4 -> Upper and Lower case check
        const upperLowerRegex = /^(?=.*[A-Z])(?=.*[a-z])/
        if(!upperLowerRegex.test(p))
            setPasswordReq4(<>Has a Uppercase and Lowercase Letter <span className="text-sm text-red-500" aria-label='Does not Meet Requirement'>&#10006;</span></>)
        else
            setPasswordReq4(<>Has a Uppercase and Lowercase Letter <span className="text-sm text-green-500" aria-label='Requirement Met'>&#10003;</span></>)
    }

    function makeAccount(){
        let returnEarly = false;
        //check 1-> check if password meets requirement
        const passwordRegex = /^(?=.{5,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-_+=:;|\[\]{}?~])[A-Za-z\d!@#$%^&*-_+=:;|\[\]{}?~]*$/
        if(!passwordRegex.test(password)){
            setPasswordCSS("border-1 border-red-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white")
            setPasswordDefaultText(<>Password <span className="text-red-500 text-xs">*does not meet password requirement</span></>);
            returnEarly = true;
        }
        else{
            setPasswordCSS("border-1 border-green-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white")
            setPasswordDefaultText(<>Password</>);
        }
        if(password != conPassword){
            setConPasswordCss("border-1 border-red-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white")
            setconPasswordDefaultText(<>Password <span className="text-red-500 text-xs">*Password does not match</span></>)
            returnEarly = true;
        }
        else{
            setConPasswordCss("border-1 border-green-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
            setconPasswordDefaultText(<>Password</>);
        }

        if (returnEarly)
            return
        
        //query for the username to see if it's in used
        if(usernameRef.current !== "" && !accountFoundRef.current){
            //create the account
            createAccount()
        }
        else {
            setUsernameCss("border-1 w-full rounded-lg border-red-500 focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
        }
    }
    const createAccount = async () => {
        try{
            console.log({username,displayname, password});
            const response = await fetch('http://localhost:8080/account/create_account', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "FE_XP": "react-frontend"
                },
                body: JSON.stringify({
                    "username": username,
                    "displayname": displayname,
                    "password": password
                })
            });
            if (!response.ok){
                alert("account creation failed");
                return;
            }
            navigate('/toOverViewTextRoom');
        } catch (error){
            console.error(error);
        }
    }
    return (
        <>
        <div className="flex items-center justify-center h-screen">
            <div className="box-border size-128 justify-center">
                <form className="grid grid-cols-1 grid-rows-4 items-center w-full h-full">
                    <div>
                        <label className='text-black dark:text-white' htmlFor='usernameField'>Username</label>
                        <input 
                            id="usernameField"
                            className={usernameCss} 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(event) => {
                                setUsername(event.target.value);
                                usernameRef.current = event.target.value;
                                if (usernameRef.current !== ""){
                                    setUserAvalible(<span className="flex items-center gap-1 mt-2">Username Avaliability: 
                                    <svg aria-hidden="true" 
                                    className="w-3 h-3 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" 
                                    viewBox="0 0 100 101" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                                        fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg></span>)
                                    setcreateDisable(true); //disable the button until the username check finishes
                                    debounceCheckUsername();
                                } else{
                                   setUserAvalible(<span className="flex items-center gap-1 mt-2">Username Avaliability:</span>); 

                                }
                            }}
                            tabIndex={0}/>
                        <p className="text-xs">{userAvalible}</p>
                    </div>
                    <div>
                        <label className='text-black dark:text-white' htmlFor='DisplayNameField'>Display Name</label>
                        <input 
                            id="DisplayNameField"
                            className="border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 
                                not-dark:focus-visible:bg-white
                                dark:focus-visible:bg-black dark:focus-visible:text-white" 
                            type="text" 
                            placeholder="Display Name"
                            value={displayname}
                            onChange={(event) => {setDisplayname(event.target.value); validatePassword}} 
                            tabIndex={0}/>
                    </div>
                    <div>
                        <label className='text-black dark:text-white' htmlFor='passwordField'>{passwordDefaultText}</label>
                        <input
                            id="passwordField"
                            className={passwordCSS}
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                                validatePassword(event.target.value);
                            }}
                            aria-describedby='passwordReq' 
                            tabIndex={0}/>
                             
                        <div className="flex flex-col text-black dark:text-white">
                            <p className="text-xs ">Passwords Must Be:</p>
                            <ol id="passwordReq" className="text-sm list-decimal ml-5">
                                <li>{passwordReq1}</li>
                                <li>{passwordReq2}</li>
                                <li>{passwordReq3}</li>
                                <li>{passwordReq4}</li>
                            </ol>
                        </div>
                    </div>
                    <div>
                        <label className='text-black dark:text-white' htmlFor='conPasswordField'>{conpasswordDefaultText}</label>
                        <input 
                            id="conPasswordField"
                            className={conPasswordCss} 
                            type="password" 
                            placeholder="Re-enter Password"
                            value={conPassword}
                            onChange={(event) => setConPassword(event.target.value)} 
                            tabIndex={0}/>
                    </div>
                </form>
                <div className="flex justify-center items-center text-black dark:text-white">
                    <button className="border-1 rounded-lg w-50 dark: not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white" onClick={makeAccount}disabled = {createDisable}>Create Account</button>
                </div>
            </div>
        </div>
        </>
    )
}



export default RegisterPage;