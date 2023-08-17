import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/Picture1.png'
import { Sidebar } from '../Sidebar/Sidebar';
function Navbar() {
    const itemValues = ['Home', 'Transform', 'Image Tagging', 'Focal Point', 'Effects']
    return (
        <nav className='w-full flex justify-center shadow-lg mb-[-20px]'>
            <div className='md:hidden'><Sidebar /></div>
            <span className='flex items-center md:absolute left-5'>
                <img src={logo} className='h-7 self-center' alt="Example" />
                <span className='self-center logo'>Imager</span>
            </span>
            <ul className='md:flex sm:flex-row flex-col items-center justify-center hidden text-white' >
                {itemValues.map((value, i) =>
                (
                    <li key={i} className='mx-2 p-4 hover:scale-110 transition-transform'><Link to={value === 'Home' ? '/' : value.replace(/\s/g, '')} >{value}</Link></li>
                )
                )}
            </ul>
        </nav >
    )
}

export default Navbar