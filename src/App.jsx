import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import bg_chat from './assets/Chat-bg.jpg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className='h-screen gap-8 flex flex-col items-center justify-center bg-black text-white'>
      <h1 className='font-bold text-4xl'>MH-Connect Comming Soon 😉</h1>
      <h1 className='font-bold text-4xl'>MH-Connect Comming Soon 😉</h1>
      </div> */}
      <div className='h-screen flex text-white bg-slate-100 border-4 border-yellow-600 pt-7'>
        <div className='flex w-full'>

        <div className=' bg-gray-100 text-black'>
          Nav
        </div>
        <div className='w-[45%] bg-black border-4 border-red-800'>
          Chat list
        </div>
        <div className='bg-white flex p-20 border-4 border-red-800'>
          <img src={bg_chat} alt="" className='bg-cover object-contain' />
        </div>
        </div>
      </div>
    </>
  )
}

export default App
