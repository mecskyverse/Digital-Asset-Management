import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { undoImageData, redoImageData } from '../../redux/features/imageSlice';
import Crop from '../../components/Crop/Crop'
import Overlay from '../../components/Overlay/Overlay'
import Frames from '../../components/Frames/Frames';
import '../../../node_modules/cropperjs/dist/cropper.css';
import { FaUndo, FaRedo } from 'react-icons/fa'
function ImageTransformation() {
    const [editOption, setEditOption] = useState('Crop')
    const dispatch = useDispatch();
    const imageDataIndex = useSelector((state) => state.image.imageDataIndex);
    const imageDataHistory = useSelector((state) => state.image.imageDataHistory)
    const totalStates = imageDataHistory.length

    const handleUndo = () => {
        if (imageDataIndex > 0) {
            dispatch(undoImageData());
        }
    };

    const handleRedo = () => {
        if (imageDataIndex < totalStates - 1) {
            dispatch(redoImageData());
        }
    };

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
                <div className='flex gap-10 justify-center mt-10 text-gray-800 text-xl'>
                    <button onClick={handleUndo} className='hover:bg-slate-600 bg-opacity-25 p-5' disabled={imageDataIndex === 0}>
                        <FaUndo />
                    </button>
                    <button onClick={handleRedo} className='hover:bg-slate-600 bg-opacity-25 p-5' disabled={imageDataIndex === totalStates - 1}>
                        <FaRedo />
                    </button>
                </div>
            </div>
        </div >
    )
}

export default ImageTransformation