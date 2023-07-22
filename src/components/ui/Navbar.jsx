import React from 'react'

function Navbar() {
    return (
        <nav className='w-full shadow-lg flex flex-row justify-center'>
            <ul className='flex sm:flex-row flex-col '>
                <li href="#" className='mx-2 p-4 hover:scale-110  transition-transform'>Home</li>
                <li href="#" className='mx-2 p-4  hover:scale-110 transition-transform'>Transform</li>
                <li href="#" className='mx-2 p-4  hover:scale-110 transition-transform'>Focal Point</li>
                <li href="#" className='mx-2 p-4  hover:scale-110 transition-transform'>Effects</li>
                <li href="#" className='mx-2 p-4  hover:scale-110  transition-transform'>Image Tag</li>
                <li href="#" className='mx-2 p-4  hover:scale-110 transition-transform'>Optimizations</li>
            </ul>
        </nav>
    )
}

export default Navbar