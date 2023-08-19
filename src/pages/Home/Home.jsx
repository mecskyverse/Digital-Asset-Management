import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';
import DragandDrop from '../../components/DragandDrop';
import LightButton from '../../components/LightButton';
import { motion } from 'framer-motion'
function Home({ childImage, image }) {
    console.log('Home', image)

    return (
        <>
            <div className='flex flex-col h-full bg-hero '>
                {/* <Navbar /> */}
                <div className='relative w-full  md:top-60 top-52 flex flex-col md:items-start items-center'>
                    <motion.div
                        whileInView={{ x: [-200, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        className='w-full'

                    >
                        <p className='hero-header w-3/4 md:w-1/3 text-5xl md:text-6xl text-center ml-20' style={{ color: "#35297f" }}>YOUR ONE STOP SOLUTION</p>
                        <DragandDrop />
                        <p className='hero-header w-3/4 md:w-1/3 text-5xl md:text-6xl text-center ml-20 leading-[60px] z-[-10]'>Let the magic Happen</p>
                    </motion.div>
                </div>
            </div >
            {/* <Sidebar /> */}
        </>
    )
}

export default Home;