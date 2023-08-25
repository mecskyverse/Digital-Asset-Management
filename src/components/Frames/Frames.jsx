import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LightButton from '../LightButton';
import './frames.css'
import { updateImageData } from '../../redux/features/imageSlice';


function Frames() {
    const [imageDimension, setImageDimension] = useState({ height: 0, width: 0 })
    const [frameStyle, setFrameStyle] = useState({
        backgroundColor: 'lightblue',
        padding: '20px',
        border: '10px solid',
        borderColor: 'teal'
    })
    const [loading, setLoading] = useState(false);

    const imageData = useSelector((state) => state.image.imageData);
    const canvasRef = useRef();
    const imageRef = useRef();
    const dispatch = useDispatch();

    const handleDownload = (finalize = false) => {
        setLoading(true);
        const canvasElement = canvasRef.current;
        const imageElement = imageRef.current;

        if (imageElement && canvasElement) {
            const ctx = canvasElement.getContext('2d')
            const padding = parseInt(frameStyle.padding, 10);
            console.log('padding', padding)
            const ratio = Math.round(imageDimension.width / imageElement.clientWidth);
            canvasElement.width = imageDimension.width + padding * ratio * 2;
            canvasElement.height = imageDimension.height + padding * ratio * 2;
            console.log('titleWidth ', imageElement.clientWidth, " ", 'titleHeight ', imageElement.clientHeight)

            ctx.fillStyle = frameStyle.backgroundColor;
            ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);



            const image = new Image();
            image.src = imageData;

            image.onload = () => {

                const x = (canvasElement.width - image.width) / 2;
                const y = (canvasElement.height - image.height) / 2;

                console.log(parseInt(frameStyle.border, 10))
                ctx.strokeStyle = frameStyle.borderColor; // Border color
                ctx.lineWidth = parseInt(frameStyle.border, 10) * ratio;// Border width
                ctx.strokeRect(0, 0, canvasElement.width, canvasElement.height);

                ctx.drawImage(image, x, y);

                if (finalize == false) {
                    // Create a download link
                    const link = document.createElement('a');
                    link.download = 'image_with_text.png';
                    link.href = canvasElement.toDataURL('image/png');
                    // Trigger the download
                    link.click();
                }
                else {
                    const base64ImageData = canvasElement.toDataURL();
                    dispatch(updateImageData(base64ImageData))
                }

            };

        }
        setLoading(false)
    }
    const handleImageLoad = () => {
        const currHeight = imageRef.current.naturalHeight;
        const currWidth = imageRef.current.naturalWidth;
        console.log('currWidth ', currWidth, " ", 'currHeight ', currHeight)

        setImageDimension({ width: currWidth, height: currHeight })
    }
    return (
        <div className='flex justify-between w-5/6 max-h-[93vh]'>
            <section className='flex w-4/5 bg-slate-700 justify-center items-center'>
                <div style={frameStyle}
                    className={`border-2 frame `} >

                    <img src={imageData} ref={imageRef} alt="new Image" onLoad={handleImageLoad} className='image1 max-h-[60vh]' />


                </div>
                <canvas
                    ref={canvasRef}
                    style={{ backgroundColor: 'lightblue' }}
                    className='relative hidden bg-emerald-900   '
                />
            </section >
            <section className=' flex flex-col items-center p-5 bg-slate-100 w-1/5'>
                <div>
                    <label className='block font-bold mb-2'>Background Color</label>
                    <input
                        type='text'
                        value={frameStyle.backgroundColor}
                        onChange={(e) => setFrameStyle({ ...frameStyle, backgroundColor: e.target.value })}
                        className='border p-2 mb-2 w-full'
                    />
                </div>
                <div>
                    <label className='block font-bold mb-2'>Padding</label>
                    <input
                        type='text'
                        value={frameStyle.padding}
                        onChange={(e) => setFrameStyle({ ...frameStyle, padding: e.target.value })}
                        className='border p-2 mb-2 w-full'
                    />
                </div>
                <div>
                    <label className='block font-bold mb-2'>Border Width</label>
                    <input
                        type='text'
                        value={frameStyle.border}
                        onChange={(e) => setFrameStyle({ ...frameStyle, border: e.target.value })}
                        className='border p-2 mb-2 w-full'
                    />
                </div>
                <div>
                    <label className='block font-bold mb-2'>Border Color</label>
                    <input
                        type='text'
                        value={frameStyle.borderColor}
                        onChange={(e) => setFrameStyle({ ...frameStyle, borderColor: e.target.value })}
                        className='border p-2 mb-2 w-full'
                    />
                </div>
                <button
                    className="w-40 self-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDownload(true)}
                >
                    {loading ? 'loading...' : 'Finalize Frame'}
                </button>
                <LightButton text={loading ? 'loading...' : 'Download'} onClick={() => handleDownload(false)} />
            </section>
        </div >
    )
}

export default Frames





