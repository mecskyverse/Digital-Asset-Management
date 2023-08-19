import React, { useState, createRef, useEffect } from 'react'
import { useSelector } from 'react-redux';
import Cropper from 'react-cropper'
import LightButton from '../../components/LightButton';
import '../../../node_modules/cropperjs/dist/cropper.css';
import DragandDrop from '../../components/DragandDrop';
const defaultSrc =
    "https://images.contentstack.io/v3/assets/blt7359e2a55efae483/blt549032e6f65d185e/648afff350d8edcbdf2f1baa/hero-composable-3_(1).svg";
function ImageTransformation({ image }) {

    const [trial, setTrial] = useState(false);
    const cropperRef = createRef();
    const imageData = useSelector((state) => state.image.imageData);
    console.log('Data', imageData);
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
            <>
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-3xl text-center mt-5'>You have not uploaded Image Please Upload! OR </div>
                    <LightButton text='Use Default' onClick={() => setTrial(true)} />
                </div>
                <DragandDrop />
            </>
        )
    }
    if (image == null && trial == true) {
        image = defaultSrc
    }
    return (
        <div className='flex flex-row w-full'>
            <div className='w-1/2'>
                <Cropper
                    ref={cropperRef}
                    style={{ height: '100vh', width: "100%" }}
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
                    checkOrientation={false}
                    guides={true}
                />
            </div>
            <div className='w-1/2 flex flex-col'>
                <div className="self-center w-96">
                    <h1 className='text-3xl text-center mt-5'>Preview</h1>
                    <div
                        className="img-preview w-full h-96"
                    />
                </div>
                <div className=" self-center mt-5 h-96" >

                    <LightButton text='Download' onClick={handleDownload} />
                    {/* <img style={{ width: "100%" }} src={cropData} alt="cropped" /> */}
                    {/* <button onClick={() => handleDownload(cropData)}>Download</button> */}
                </div>
            </div>
        </div>
    )
}

export default ImageTransformation