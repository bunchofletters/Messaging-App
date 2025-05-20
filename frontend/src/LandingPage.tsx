import './App.css'
import { Link } from 'react-router';

function LandingPage() {
  
  return(
    <>
      <div id="main-page-container">
        <div id="side-1" className='flex justify-center items-center h-screen' >
          <img className="w-50 h-50"src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IMessage_logo.svg/2048px-IMessage_logo.svg.png' alt="A White Speech Bubble Surround by a Green Background. Also Known as the IMessage Logo"></img>
        </div>
        <div id="side-2">
          <Link tabIndex={-1} to="/login" className="main-page-button">
            <button className='justify-center item-center w-full h-full p-2 hover:cursor-pointer focus:font-bold'>Login in</button>
          </Link>
          <Link tabIndex={-1} to="/register" className="main-page-button">
            <button className='justify-center item-center w-full h-full p-2 hover:cursor-pointer'>Sign Up</button>
          </Link>
          <p className='relative text-center text-xs mt-[-37px]'>By Signing Up You Agree to Our <span className="relative underline text-blue-700">Terms and Service</span></p>
        </div>
      </div>
    </>
  )
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //     <p className='underline'>Testing: {message}</p>
  //   </>
  // )
}

export default LandingPage
