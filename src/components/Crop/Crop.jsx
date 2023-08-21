import React, { createRef, useState } from 'react'
import { useSelector } from 'react-redux';
import Cropper from 'react-cropper'
import '../../../node_modules/cropperjs/dist/cropper.css';
import DragandDrop from '../DragandDrop';
import LightButton from '../../components/LightButton';
function Crop() {
    const [trial, setTrial] = useState(false);
    const imageData = useSelector((state) => state.image.imageData);
    const cropperRef = createRef();
    const handleDownload = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            const link = document.createElement("a");
            link.href = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            link.download = "image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (imageData == null && trial == false) {
        return (
            <div className='bg-edit w-full h-[93vh] flex flex-col items-center gap-10 justify-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-3xl text-center mt-5'>You have not uploaded Image Please Upload! OR </div>
                    <LightButton text='Use Default' onClick={() => setTrial(true)} />
                </div>
                <DragandDrop />
            </div>
        )
    }
    if (image == null && trial == true) {
        image = defaultSrc
    }
    return (
        <>
            <div className='md:w-1/2 w-5/6 flex justify-center'>
                <Cropper
                    ref={cropperRef}
                    style={{ height: '93vh', width: '100%' }}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={imageData}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={true}
                    guides={true}
                />
            </div>
            <div className='md:flex hidden w-1/3 flex-col'>
                <div className="flex flex-col items-center self-center w-full">
                    <h1 className='text-3xl text-center mt-5'>Preview</h1>
                    <div
                        className="img-preview w-full h-96"
                    />
                </div >
                <div className=" self-center mt-5 h-96" >

                    <LightButton text='Download' onClick={handleDownload} />
                </div>
            </div >
        </>
    )
}

export default Crop