import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
    return (
        <nav className='w-full shadow-lg flex flex-row justify-center'>
            <ul className='flex sm:flex-row flex-col '>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'><Link to='/' >Home</Link></li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'><Link to='/transform' >Transform</Link></li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'>Focal Point</li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'>Effects</li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'><Link to='/Tagging' >Tagging</Link></li>
                <li className='mx-2 p-4 hover:scale-110 transition-transform'>Optimizations</li>
            </ul>
        </nav>
    )
}

export default Navbar