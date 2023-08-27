import React, { useState, useRef, useEffect } from 'react';
import './overlay.css';
import { useSelector, useDispatch } from 'react-redux';
import { setImageData } from '../../redux/features/imageSlice';
import Draggable from 'react-draggable';
import LightButton from '../LightButton';
function Overlay() {
    const imageData = useSelector((state) => state.image.imageData);
    const [text, setText] = useState('This is my draggable text let\'s say');
    const [styleDetail, setStyleDetail] = useState({
        font: 'Arial',
        fontSize: 28,
        color: 'red'
    })
    const [originalImageDimension, setOriginalImageDimension] = useState({ height: 0, width: 0 })
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [bounds, setBounds] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
    const [loading, setLoading] = useState(false)
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const elementRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        const updateDimensions = () => {
            const imageElement = imageRef.current;
            const element = elementRef.current;

            if (imageElement) {
                const width = element.clientWidth;
                const height = element.clientHeight;
                console.log(`Width: ${width}px, Height: ${height}px`);
                const rect = imageElement.getBoundingClientRect();
                setBounds({
                    top: 0,
                    bottom: rect.bottom - height - 56,
                    left: 0,
                    right: rect.right - width,
                });
            }

        }
        updateDimensions();

        // Adding a resize event listener to recalculate dimensions on window resize
        window.addEventListener('resize', updateDimensions);

        // Cleaning up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [styleDetail, text, originalImageDimension]);

    const trackPos = (data) => {
        setPosition({ x: data.x, y: data.y });
    };
    const handleImageLoad = () => {
        const currHeight = imageRef.current.naturalHeight;
        const currWidth = imageRef.current.naturalWidth;
        setOriginalImageDimension({ width: currWidth, height: currHeight })
    }

    const handleDownload = (finalize = false) => {
        const canvasElement = canvasRef.current;
        const imageElement = imageRef.current;

        if (imageElement && canvasElement) {
            const ctx = canvasElement.getContext('2d');

            canvasElement.width = originalImageDimension.width
            canvasElement.height = originalImageDimension.height


            // Drawing the image on the canvas
            ctx.drawImage(imageElement, 0, 0);
            //Scaling the image because image on screen size can differ from orginal image
            const scaleX = originalImageDimension.width / imageElement.clientWidth;
            const scaleY = originalImageDimension.height / imageElement.clientHeight;
            const fontRatio = Math.round(styleDetail.fontSize * scaleX)
            // // Drawing the draggable text on the canvas
            ctx.font = `${Math.round(styleDetail.fontSize * scaleX)}px ${styleDetail.font}`;
            ctx.fillStyle = styleDetail.color;
            ctx.fillText(text, position.x * scaleX, ((position.y * scaleY + fontRatio + 2))); // Use the draggable text's position

            if (finalize == false) {
                // Create a download link
                const link = document.createElement('a');
                link.download = 'image_with_text.png';
                link.href = canvasElement.toDataURL('image/png');

                // Trigger the download
                link.click();
            }
            else {
                const base64Image = canvasElement.toDataURL()
                console.log(base64Image)
                dispatch(setImageData({ imageData: base64Image }))
            }
        }
    }


    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleStyleChange = (e) => {
        const { name, value } = e.target;
        setStyleDetail((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    return (
        <div className='flex justify-between w-5/6 max-h-[93vh]'>
            <div className='parent '>
                <img src={imageData} ref={imageRef} onLoad={handleImageLoad} alt="new Image" className='image1 max-h-[93vh]' />
                <canvas ref={canvasRef} className='relative hidden' />
                <Draggable bounds={bounds} onDrag={(e, data) => trackPos(data)}>
                    <div className='box image2' ref={elementRef} >
                        <div
                            style={{
                                fontFamily: styleDetail.font,
                                fontSize: `${styleDetail.fontSize}px`,
                                color: styleDetail.color,
                            }}
                            className='text'>{text}</div>
                    </div>
                </Draggable>
            </div>
            <section className='w-1/3 z-40 border-2 '>
                <div className="w-full max-w-md mx-auto flex flex-col p-4 h-full space-y-4 bg-white shadow-md">
                    <div>
                        <label htmlFor="text" className="text-sm font-medium">
                            Text:
                        </label>
                        <input
                            type="text"
                            id="text"
                            value={text}
                            onChange={handleTextChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <div>
                        <label htmlFor="font" className="text-sm font-medium">
                            Font:
                        </label>
                        <select
                            id="font"
                            name="font"
                            value={styleDetail.font}
                            onChange={handleStyleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            <option value="Arial">Arial</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fontSize" className="text-sm font-medium">
                            Font Size:
                        </label>
                        <select
                            id="fontSize"
                            name="fontSize"
                            value={styleDetail.fontSize}
                            onChange={handleStyleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        >
                            <option value="12">12px</option>
                            <option value="16">16px</option>
                            <option value="20">20px</option>
                            <option value="28">28px</option>
                            <option value="32">32px</option>
                            <option value="40">40px</option>

                        </select>
                    </div>
                    <div>
                        <label htmlFor="color" className="text-sm font-medium">
                            Color:
                        </label>
                        <input
                            type="color"
                            id="color"
                            name="color"
                            value={styleDetail.color}
                            onChange={handleStyleChange}
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
                        />
                    </div>
                    <button
                        className="w-40 self-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDownload(true)}
                    >
                        {loading ? 'loading...' : 'Finalize Overlay'}
                    </button>
                    <span className='self-center'><LightButton text='Download' onClick={handleDownload} /></span>
                </div>
            </section>
        </div >

    );

}

export default Overlay;




