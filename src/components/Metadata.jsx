import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EXIF from 'exif-js';

const ImageMetadataViewer = () => {
    const [metadata, setMetadata] = useState(null);
    const imageData = useSelector((state) => state.image.imageData)
    console.log(imageData)
    useEffect(() => {
        if (imageData) {
            const image = new Image();
            image.src = imageData;

            image.onload = () => {
                // Using EXIF.getData to extract EXIF metadata
                EXIF.getData(image, function () {
                    console.log('loaded')
                    const allMetadata = EXIF.getAllTags(this);
                    console.log(allMetadata)
                    setMetadata(allMetadata);
                });
            };
        }
    }, [imageData])

    console.log(metadata)
    return (
        <div>
            {metadata && (
                <div>
                    <h2>Image Metadata</h2>
                    <pre>{JSON.stringify(metadata, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ImageMetadataViewer;
