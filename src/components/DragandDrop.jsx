import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setImageData, clearImageData } from '../redux/features/imageSlice';
import LightButton from './LightButton';
import { FaUpload } from 'react-icons/fa'
function DragandDrop() {

    const [dragging, setDragging] = useState(false);
    const location = useLocation();
    const imageData = useSelector((state) => state.image.imageData);
    const imageName = useSelector((state) => state.image.imageName)
    const imageFormat = useSelector((state) => state.image.imageFormat)
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);

    //Function executed when we click on file upload button
    const handleUpload = () => {
        fileInputRef.current.click();
        console.log("Upload button clicked")
    }
    function extractImageFormat(dataURI) {
        // Extract the format part after "image/"
        const formatMatch = dataURI.match(/image\/(.*?)\;/);

        if (formatMatch && formatMatch.length > 1) {
            const format = formatMatch[1];
            return format;
        }

    }
    console.log(imageFormat)
    // console.log(imageData)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64ImageData = e.target.result;
                const format = extractImageFormat(base64ImageData)
                dispatch(setImageData({ imageName: file.name, imageData: base64ImageData, imageFormat: format }));
            };

            reader.readAsDataURL(file);
        } else {
            dispatch(clearImageData());
        }
    };

    //Set of functions executed while we drag an image over home page
    const handleDragOver = (event) => {
        event.preventDefault();
        console.log("Dragging..")
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64ImageData = e.target.result;
                const format = extractImageFormat(base64ImageData)
                dispatch(setImageData({ imageName: file.name, imageData: base64ImageData, imageFormat: format }));
            };

            reader.readAsDataURL(file);
        } else {
            dispatch(clearImageData());
        }
    };
    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-8 w-3/4 border-2 ml-20 md:w-1/3 rounded-md border-emerald-900 ${location.pathname === '/Edit' ? 'text-blue-800' : 'text-gray-200'} ${dragging ? 'border-dashed bg-blue-400' : 'border-solid'} text-center h-24 flex items-center justify-center`}
        >
            {imageData ? (
                <div className='flex gap-8 items-center'>
                    <p >Uploaded File: {imageName}</p>
                    <LightButton text='Upload New' onClick={() => dispatch(clearImageData())} />
                </div>
            ) : (
                <div className='flex justify-center gap-7 items-center'>
                    <p className='text-lg'>Drag and drop your image here</p>
                    <span className='text-xl text-gray-600 hover:bg-slate-300 p-3 rounded-lg' onClick={handleUpload}>
                        <FaUpload fontSize='inherit' />
                    </span >
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            )}
        </div>



    )
}

export default DragandDrop