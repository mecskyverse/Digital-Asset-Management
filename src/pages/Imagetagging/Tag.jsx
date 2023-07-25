import React, { useEffect, useState } from 'react'
import LightButton from '../../components/LightButton'
import cars from '../../../public/Demo-images/car.jpg'
function Tag({ image }) {
    const [selectedImage, setSelecetedImage] = useState(null);
    const [tagsArray, setTagsArray] = useState();
    const [loading, setLoading] = useState(false);
    const photos = [
        'car.jpg',
        'desk.jpg',
        'mountain.jpg',
        'team.jpg',
        'Universe.jpg',
        'waterfall.jpg'
    ]

    const handleTagsClick = async () => {
        fetchData();
    }
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://github.com/mecskyverse/Digital-Asset-Management/blob/main/public/Demo-images/${selectedImage}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa('acc_a278fd3f6c62f78:eb085c7a646dfb49c07861593155b1e3')
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setTagsArray(data.result.tags.slice(0, 10));
            setLoading(false);

        } catch (error) {

            console.error("Fetch error:", error);
            setLoading(false)
        }
    };



    if (selectedImage) {
        return (
            <div className='flex flex-row h-[calc(93vh)] bg-cyan-100 border-red-800  items-center'>
                <img src={`Demo-images/${selectedImage}`} className='w-1/2 rounded-xl m-5 self-center' />
                <div className='w-1/2 h-96 place-self-center flex justify-center items-center'>
                    {!tagsArray && (loading ? <LightButton text="loading..." onClick={handleTagsClick} /> :
                        <LightButton text="Get Tags" onClick={handleTagsClick} />
                    )}
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
                        src={`Demo-images/${photo}`}
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