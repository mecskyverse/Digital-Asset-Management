import React, { useState } from 'react'

function DragandDrop({ onChildImageUpload }) {

    const [dragging, setDragging] = useState(false);
    const [droppedFile, setDroppedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        onChildImageUpload(file);
        // Do something with the dropped file
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="bg-gradient-to-r from-blue-500 to-pink-500 bg-opacity-75 h-96 flex justify-around items-center">
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-8 w-1/3 border-2 rounded-md border-emerald-900 ${dragging ? 'border-dashed bg-blue-400' : 'border-solid'} text-center text-gray-200 h-24`}
            >
                {droppedFile ? (
                    <p>Dropped File: {droppedFile.name}</p>
                ) : (
                    <p>Drag and drop a image here</p>
                )}
            </div>
            {imagePreview && (
                <img

                    src={imagePreview}
                    alt="Selected File Preview"
                    style={{ maxWidth: '600px', maxHeight: '370px' }}
                />

            )}
        </div>

    )
}

export default DragandDrop