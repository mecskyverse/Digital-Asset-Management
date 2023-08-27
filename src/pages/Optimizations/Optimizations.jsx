import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { undoImageData, redoImageData } from '../../redux/features/imageSlice';
import '../../../node_modules/cropperjs/dist/cropper.css';
import LightButton from '../../components/LightButton';
import DragandDrop from '../../components/DragandDrop';
import { FaUndo, FaRedo } from 'react-icons/fa'
function Optimizations() {
    const [optimizeOptions, setOptimizeOptions] = useState('Convert')

    const [selectedOutputFormat, setSelectedOutputFormat] = useState('jpeg');
    const [isConverted, setIsConverted] = useState(false)
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [compressedDataUrl, setCompressedDataUrl] = useState(null);

    const dispatch = useDispatch();
    const imageData = useSelector((state) => state.image.imageData)
    const imageDataIndex = useSelector((state) => state.image.imageDataIndex);
    const imageDataHistory = useSelector((state) => state.image.imageDataHistory)
    const imageFormat = useSelector((state) => state.image.imageFormat)


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

    const handleConvert = (isDownload = false) => {
        console.log('clicked')
        !isDownload && alert(`Converting from ${imageFormat} to ${selectedOutputFormat}`);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Load the input image onto the canvas
        const img = new Image();
        img.src = imageData;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            // Convert the canvas content to a new format (e.g., JPEG)
            const newDataURI = canvas.toDataURL(`image/${selectedOutputFormat}`);

            if (isDownload) {
                const a = document.createElement('a');
                a.href = newDataURI;
                a.download = `converted.${selectedOutputFormat}`;
                a.textContent = 'Download';


                document.body.appendChild(a);
                a.click();
            }
            setIsConverted(true)
            // newDataURI now contains the image in the desired format
            console.log(newDataURI);
        };

    };
    const handleCompress = () => {
        if (!width || !height) {
            alert('Please enter valid width and height.');
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.src = imageData
        image.onload = () => {
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(image, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed

            setCompressedDataUrl(compressedDataUrl);
        };
    };
    if (imageData == null) {
        return (
            <div className='bg-edit w-full h-[93vh] flex flex-col items-center gap-10 justify-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-3xl text-center mt-5'>You have not uploaded Image Please Upload!</div>

                </div>
                <DragandDrop />
            </div>
        )
    }

    return (
        <div className='flex flex-col w-full bg-edit h-[93vh]'>
            {
                optimizeOptions === 'Convert' ?
                    (
                        <>
                            <h1 className="text-3xl font-semibold mt-10 w-5/6 text-center">Image Format Converter</h1>
                            <section className='flex flex-col  justify-start mt-20 items-center w-5/6 h-full'>

                                <div className="flex items-center space-x-4 ">
                                    <label className="text-xl font-medium">Your Input Format:</label>
                                    <select
                                        className="border rounded-md p-1"
                                        value={imageFormat}

                                    >
                                        <option value="jpeg">JPEG</option>
                                        <option value="png">PNG</option>
                                        <option value="webp">WebP</option>
                                    </select>
                                    <label className="text-xl font-medium">Select Output Format:</label>
                                    <select
                                        className="border rounded-md p-1"
                                        value={selectedOutputFormat}
                                        onChange={(e) => setSelectedOutputFormat(e.target.value)}
                                    >
                                        <option value="jpeg">JPEG</option>
                                        <option value="png">PNG</option>
                                        <option value="webp">WebP</option>
                                    </select>

                                    {
                                        !isConverted ? <button
                                            className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                                            onClick={() => handleConvert(false)}
                                        >
                                            Convert
                                        </button> :
                                            <button
                                                className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600"
                                                onClick={() => handleConvert(true)}
                                            >
                                                Download
                                            </button>
                                    }
                                </div>
                            </section>
                        </>
                    ) : optimizeOptions === 'Compress' ?
                        (
                            <>
                                <h1 className="text-3xl font-semibold mt-10 w-5/6 text-center">Image Compresser </h1>
                                <section className='flex flex-row  justify-start mt-20 items-center w-5/6 h-full'>
                                    {compressedDataUrl && (
                                        <div className="mt-4 max-h-[93vh]">
                                            <h3 className="text-lg font-semibold mb-2">Compressed Image:</h3>
                                            <img src={compressedDataUrl} alt="Compressed" className="max-w-full max-h-[93vh]" />
                                        </div>
                                    )}

                                    <div className="p-4 max-w-md mx-auto border rounded-lg shadow-lg">

                                        <div className="mb-2">
                                            <label htmlFor="width" className="block text-sm font-medium mb-1">Width:</label>
                                            <input
                                                type="number"
                                                id="width"
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value)}
                                                className="w-full px-2 py-1 border rounded-md"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="height" className="block text-sm font-medium mb-1">Height:</label>
                                            <input
                                                type="number"
                                                id="height"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                className="w-full px-2 py-1 border rounded-md"
                                            />
                                        </div>
                                        <button
                                            onClick={handleCompress}
                                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                                        >
                                            Compress
                                        </button>

                                    </div>
                                </section>
                            </>
                        ) :
                        (
                            <div>metadata</div>
                        )

            }
            <div className='w-1/6 flex flex-col border border-red-200 absolute right-0 h-[93vh]'>
                <div className='text-3xl text-center mb-10 mt-4 font-bold'>Optimize Options</div>
                <hr />


                {['Convert', 'Compress', 'Metadata'].map((item) => {
                    return (
                        <>
                            <button onClick={() => setOptimizeOptions(item)} className={`${optimizeOptions == item ? 'bg-white' : 'hover:bg-slate-300'} h-28 text-xl`}>{item}</button >
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

export default Optimizations