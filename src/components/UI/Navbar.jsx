import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/logo.png'
import { Sidebar } from '../Sidebar/Sidebar';
function Navbar() {
    const itemValues = ['Home', 'Edit', 'Image Tagging', 'Effects', 'Optimizations']
    return (
        <div>
            <div className='md:hidden z-[150]'>
                <Sidebar />
            </div>
            <nav className='w-full flex justify-center shadow-lg nav ' >
                <span className='flex items-center md:absolute left-5'>
                    <Link to='/' className='flex h-full'>
                        <img src={logo} className='h-7 self-center' alt="Example" />
                        <span className='self-center logo'>Imager</span>
                    </Link>
                </span>
                <ul className='md:flex sm:flex-row flex-col items-center justify-center hidden' style={{ color: "#35297f" }}  >
                    {itemValues.map((value, i) =>
                    (
                        <li key={i} className='mx-2 p-4 hover:scale-110 transition-transform'><Link to={value === 'Home' ? '/' : value.replace(/\s/g, '')} >{value}</Link></li>
                    )
                    )}
                </ul>
            </nav >
        </div >
    )
}

export default Navbar