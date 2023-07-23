import React, { useEffect, useState } from 'react'
import LightButton from '../../components/LightButton'
import cars from '../../../public/Demo-images/car.jpg'

function Tag({ image }) {
    const [selectedImage, setSelecetedImage] = useState(null);
    const [tagsArray, setTagsArray] = useState();
    const photos = [
        'car.jpg',
        'desk.jpg',
        'mountain.jpg',
        'team.jpg',
        'Universe.jpg',
        'waterfall.jpg'
    ]
    /* 
        Major Role of this function is that we need to send an image file to Imagga API for tag generation. 
        The file constructor is reading the image as an blob object then  this file is transefered to fetchData()
        for fetching the tags related to files.
    */
    const handleTagsClick = async () => {
        const filePath = `../../../public/Demo-images/${selectedImage}`;
        const response = await fetch(filePath);
        const blob = await response.blob();
        const file = new File([blob], 'car.jpg');

        const formData = new FormData();
        formData.append('image', file);
        fetchData(formData);
    }
    const fetchData = async (form) => {
        try {
            const response = await fetch('https://api.imagga.com/v2/tags', {
                method: "POST",
                headers: {
                    Authorization: `Basic ${btoa(import.meta.env.VITE_IMAGGA_API_KEY)}`,
                },
                body: form
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setTagsArray(data.result.tags.slice(0, 10));
            console.log(data);
            console.log('final array', tagsArray)
            console.log('final array', tagsArray)

        } catch (error) {
            console.error("Fetch error:", error);
        }
    };



    if (selectedImage) {
        return (
            <div className='flex flex-row h-[calc(93vh)] bg-cyan-100 border-red-800  items-center'>
                <img src={`../../public/Demo-images/${selectedImage}`} className='w-1/2 rounded-xl m-5 self-center' />
                <div className='w-1/2 h-96 place-self-center flex justify-center items-center'>
                    {!tagsArray && <LightButton text="Get Tags" onClick={handleTagsClick} />}
                    {
                        tagsArray &&
                        (<div>
                            <ul className="grid grid-cols-3 gap-4">
                                {tagsArray.map((item, index) => (
                                    <li key={index} className="p-2">
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            <span
                                                className="bg-gray-200 text-gray-800 px-2 py-1 rounded"
                                            >
                                                {item.tag.en}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>)
                    }
                </div>
            </div>
        )
    }
    return (
        <div>
            <h1 className='text-4xl text-center mt-3'>Select any one image for its tag</h1>
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
                {photos.map((photo, index) => (

                    <img
                        key={index}
                        src={`../../../public/Demo-images/${photo}`}
                        alt={`Photo ${photo}`}
                        className='w-full h-full object-cover rounded hover:scale-105 transition-transform'
                        onClick={() => setSelecetedImage(photo)}

                    />

                ))}
            </div>
        </div>
    )
};


export default Tag