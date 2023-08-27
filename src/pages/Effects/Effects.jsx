import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateImageData, undoImageData, redoImageData } from '../../redux/features/imageSlice';
import LightButton from '../../components/LightButton';
import Slider from '../../components/Slider'
import SidebarItem from '../../components/EffectsSidebar'
import DragandDrop from '../../components/DragandDrop';
import { FaUndo, FaRedo } from 'react-icons/fa'

const DEFAULT_OPTIONS = [
    {
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        range: {
            min: 0,
            max: 200
        },
        unit: '%'
    },
    {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        range: {
            min: 0,
            max: 100
        },
        unit: '%'
    },
    {
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        range: {
            min: 0,
            max: 360
        },
        unit: 'deg'
    },
    {
        name: 'Blur',
        property: 'blur',
        value: 0,
        range: {
            min: 0,
            max: 20
        },
        unit: 'px'
    }
]

function App() {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
    const [options, setOptions] = useState(DEFAULT_OPTIONS)
    const selectedOption = options[selectedOptionIndex]
    const [imageDimension, setImageDimension] = useState({ height: 0, width: 0 })
    const [loading, setLoading] = useState(false)
    const [trial, setTrial] = useState(false);

    const imageDataIndex = useSelector((state) => state.image.imageDataIndex);
    const imageDataHistory = useSelector((state) => state.image.imageDataHistory)
    const totalStates = imageDataHistory.length
    const imageData = useSelector((state) => state.image.imageData);
    const canvasRef = useRef();
    const imageRef = useRef();
    const dispatch = useDispatch();
    const defaultSrc = '../../../public/contentStack.jpg'




    const handleImageLoad = () => {
        const currHeight = imageRef.current.naturalHeight;
        const currWidth = imageRef.current.naturalWidth;
        setImageDimension({ width: currWidth, height: currHeight })
    }

    function handleSliderChange({ target }) {
        setOptions(prevOptions => {
            return prevOptions.map((option, index) => {
                if (index !== selectedOptionIndex) return option
                return { ...option, value: target.value }
            })
        })
    }
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

    function getImageStyle(forCanvas = false) {
        const filters = options.map(option => {
            return `${option.property}(${option.value}${option.unit})`
        })
        if (forCanvas) {
            return filters.join('')
        }
        return { filter: filters.join(' ') }
    }

    const handleDownload = (finalize = false) => {
        setLoading(true);
        const canvasElement = canvasRef.current;
        const imageElement = imageRef.current;
        if (imageElement && canvasElement) {
            const ctx = canvasElement.getContext('2d')



            canvasElement.width = imageDimension.width
            canvasElement.height = imageDimension.height

            ctx.filter = getImageStyle(true);
            ctx.drawImage(imageElement, 0, 0);
            if (finalize == false) {
                // Create a download link
                const link = document.createElement('a');
                link.download = 'image_with_effects.png';
                link.href = canvasElement.toDataURL('image/png');
                // Trigger the download
                link.click();
            }
            else {
                const base64ImageData = canvasElement.toDataURL();
                dispatch(updateImageData(base64ImageData))
            }



        }
        setLoading(false)
    }

    if (imageData == null && trial == true) {
        dispatch(updateImageData(defaultSrc))
    }
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

    return (
        <div className="flex flex-row h-[93vh] bg-gradient-to-r from-blue-400 via-purple-200 to-pink-500">
            <section className='flex flex-col items-center h-full w-4/5 bg-black bg-opacity-50'>
                <img src={imageData} className="main-image " style={getImageStyle()} onLoad={handleImageLoad} ref={imageRef} />
                <canvas
                    ref={canvasRef}
                    className='hidden '
                />
                <Slider
                    min={selectedOption.range.min}
                    max={selectedOption.range.max}
                    value={selectedOption.value}
                    handleChange={handleSliderChange}
                />
            </section>
            <div className="sidebar flex flex-col border-2 border-white bg-transparent h- w-1/5">
                {options.map((option, index) => {
                    return (
                        <SidebarItem
                            key={index}
                            name={option.name}
                            active={index === selectedOptionIndex}
                            handleClick={() => setSelectedOptionIndex(index)}
                        />
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
                <button
                    className="w-40 self-center mt-10 border bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDownload(true)}
                >
                    {loading ? 'loading...' : 'Finalize Effect'}
                </button>
                <span className='self-center mt-10'>
                    <LightButton
                        text={loading ? 'loading...' : 'Download'}
                        onClick={() => handleDownload(false)}
                    />
                </span>
            </div>


        </div>
    )
}

export default App;