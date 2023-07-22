import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';
import DragandDrop from '../../components/DragandDrop';
import LightButton from '../../components/LightButton';
function Home({ childImage, image }) {
    console.log('Home', image)

    return (
        <div className='flex flex-col h-full'>
            <DragandDrop onChildImageUpload={childImage} />
            {
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
            }
        </div>
    )
}

export default Home;