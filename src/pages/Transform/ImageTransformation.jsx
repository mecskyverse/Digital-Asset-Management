import React, { useState } from 'react'
import Crop from '../../components/Crop/Crop'
import Overlay from '../../components/Overlay/Overlay'
import Frames from '../../components/Frames/Frames';
import '../../../node_modules/cropperjs/dist/cropper.css';
function ImageTransformation() {
    const [editOption, setEditOption] = useState('Crop')
    return (
        <div className='flex flex-row w-full bg-edit h-[93vh]'>
            {editOption === 'Crop' ? <Crop /> : editOption === 'Overlay' ? <Overlay /> : <Frames />}
            <div className='w-1/6 flex flex-col border border-red-200 absolute right-0 h-[93vh]'>
                <div className='text-3xl text-center mb-10 mt-4 font-bold'>Edit Options</div>
                <hr />


                {['Crop', 'Overlay', 'Frames'].map((item) => {
                    return (
                        <>
                            <button onClick={() => setEditOption(item)} className={`${editOption == item ? 'bg-white' : 'hover:bg-slate-300'} h-28 text-xl`}>{item}</button >
                            <hr />
                        </>
                    )
                })}
            </div>
        </div >
    )
}

export default ImageTransformation