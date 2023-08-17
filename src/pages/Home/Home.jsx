import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';
import DragandDrop from '../../components/DragandDrop';
import LightButton from '../../components/LightButton';
import Button from '@mui/material/Button';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { MotionConfig } from 'framer-motion';
import { motion } from 'framer-motion'
function Home({ childImage, image }) {
    console.log('Home', image)

    return (
        <>
            <div className='flex flex-col h-full bg-hero '>
                <Navbar />
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
{/* <DragandDrop onChildImageUpload={childImage} /> */ }
{/* <section className='hero-section w-full h-full bg-[#9699f8] mt-[-60px] -z-10'></section> */ }
{/* <section className="relative h-screen bg-[#9699f8] mt-[-60px] -z-10 ">
                    <div className="absolute flex flex-col justify-center inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${hero})` }}>
                        <h1 className='text-5xl w-1/3 text-center ml-20'>Drop Your Image and </h1>
                        <div className='mt-52'>
                            <DragandDrop />
                            <p className='hero-header w-1/2 md:w-1/3 text-center ml-20 font-[3000]'>Let the magic Happen</p>
                        </div>
                    </div>
                </section> */}

{/* {
                    image ? <>
                        <h2 className='text-2xl text-center mt-10'>What do you wanted to do with this image</h2>
                        <div className='flex justify-center m-10 gap-10'>
                            <Link to='/transform'><LightButton text="Transform" /></Link>
                            <LightButton text="Focal Point" />
                            <LightButton text="Effects" />
                            <LightButton text="Image Tag" />
                            <LightButton text="Optimization" />

                        </div>
                    </> :
                        <div className='flex flex-row'>
                            <div className='w-1/2 flex justify-center'><h2 className='text-center self-center text-container'>Upload Your Image and let the magic happen</h2></div>
                            <div className="svg-container"></div>
                        </div>
                } */}