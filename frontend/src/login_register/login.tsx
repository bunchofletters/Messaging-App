import {useState} from 'react'

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
        <div className="flex h-screen items-center justify-center">
            <div className="box-border size-128 justify-center">
                <form className="grid grid-cols-1 grid-rows-4 items-center w-full h-full">
                    <div>
                        <label className='text-black dark:text-white' htmlFor='usernameField'>Username</label>
                        <input 
                            id="usernameField" 
                            type="text" 
                            className="border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white"
                            placeholder="Username"
                            value={username}
                            tabIndex={0}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div>
                        <label className='text-black dark:text-white'>Password</label>
                        <input 
                            type="password" 
                            className="border-1 w-full rounded-lg focus:ring-blue-500 bg-gray-400 text-black p-2.5 not-dark:focus-visible:bg-white dark:focus-visible:bg-black dark:focus-visible:text-white"
                            placeholder="Password"
                            value={password}
                            tabIndex={0}
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