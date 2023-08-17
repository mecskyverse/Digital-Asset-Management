import React, { useState, useRef } from 'react'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from '@mui/material';
function DragandDrop({ onChildImageUpload }) {

    const [dragging, setDragging] = useState(false);
    const [droppedFile, setDroppedFile] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    //Function executed when we click on file upload button
    const handleUpload = () => {
        fileInputRef.current.click();
        console.log("Upload button clicked")
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
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
        setSelectedFile(file)
    };


    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`p-8 w-3/4 border-2 ml-20 md:w-1/3 rounded-md border-emerald-900 ${dragging ? 'border-dashed bg-blue-400' : 'border-solid'} text-center text-gray-200 h-24 flex items-center justify-center`}
        >
            {selectedFile ? (
                <p>Uploaded File: {selectedFile.name}</p>
            ) : (
                <div className='flex justify-center gap-7 items-center'>
                    <p className='text-lg'>Drag and drop your image here</p>
                    <IconButton aria-label="upload" size='large' onClick={handleUpload}>
                        <FileUploadIcon fontSize='inherit' />
                    </IconButton>
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