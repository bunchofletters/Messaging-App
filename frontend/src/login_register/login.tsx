import {useState} from 'react'
import { useNavigate } from 'react-router';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [usernameText, setusernameText] = useState(<>Username</>)
    const [usernameCss, setusernameCSS] = useState("border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
    const [password, setPassword] = useState("");
    const [passwordText, setpasswordText] = useState(<>Password</>)
    const [passwordCss, setpasswordCSs] = useState("border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");


    async function SignIN(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        //check if username exist
        const usernameResult = await CheckUsername();
        if (!usernameResult){
            setusernameCSS("border-1 border-red-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
            setusernameText(<>Username <span className='text-red-500'>*Username not Found</span></>)
            setpasswordCSs("border-1 border-red-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
            setpasswordText(<>Password <span className='text-red-500'>*Password is Incorrect</span></>)
            setPassword("");
            return
        }
        const passwordResult = await checkPassword();
        if (!passwordResult){
            setpasswordCSs("border-1 border-red-500 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white");
            setpasswordText(<>Password <span className='text-red-500'>*Password is Incorrect</span></>)
            setPassword("");
            return
        }
        navigate('/OverViewTextRoom');
    }

    async function CheckUsername(){
        try{
            const response = await fetch(`http://localhost:8080/account/user?username=${username}`, {
                method: "GET",
                headers: {
                    "FE_XP": "react-frontend"
                }
            });
            if (response.ok) //username was found
                return true
            return false
        } catch (err){
            console.error(err);
        }
    }

    async function checkPassword(){
        try{
            const response = await fetch('http://localhost:8080/account/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "FE_XP": "react-frontend"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                }),
            });
            console.log(response)
            if (response.ok)
                return true;
            return false;
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
        <div className="flex h-screen items-center justify-center">
            <div className="box-border size-128 justify-center">
                <form className="grid grid-cols-1 grid-rows-4 items-center w-full h-full" onSubmit={SignIN}>
                    <div>
                        <label className='text-black dark:text-white' htmlFor='usernameField'>{usernameText}</label>
                        <input 
                            id="usernameField" 
                            type="text" 
                            className={usernameCss}
                            placeholder="Username"
                            value={username}
                            tabIndex={0}
                            onChange={(event) => {
                                setUsername(event.target.value);
                                setusernameText(<>Username</>);
                                }
                            }
                        />
                    </div>
                    <div>
                        <label className='text-black dark:text-white'>{passwordText}</label>
                        <input 
                            type="password" 
                            className={passwordCss}
                            value={password}
                            tabIndex={0}
                            placeholder='Password'
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-center text-black dark:text-white">
                        <button className="border-1 rounded-lg w-50 dark: not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}
export default LoginPage;