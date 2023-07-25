import React, { useEffect, useState } from 'react'
import LightButton from '../../components/LightButton'
import cars from '../../../public/Demo-images/car.jpg'
function Tag({ image }) {
    const [selectedImage, setSelecetedImage] = useState(null); //keep track of weather we have selected an image or not
    const [tagsArray, setTagsArray] = useState();//keep track of have we got the tags array from imagga api
    const [loading, setLoading] = useState(false);//will change the ui when we are calling fetch function
    //All the photos array to use in map function for rendering.
    const photos = [
        'car.jp',
        'desk.jpg',
        'mountain.jpg',
        'team.jpg',
        'Universe.jpg',
        'waterfall.jpg'
    ]
    //getting this image url from github and sending this to imagga api with GET request and response we are getting tags for the relevant image.
    const imgUrl = `https://raw.githubusercontent.com/mecskyverse/Digital-Asset-Management/main/public/Demo-images/${selectedImage}`
    const handleTagsClick = async () => {
        fetchData();
    }
    const fetchData = async (form) => {
        setLoading(true);
        try {
            //sending the GET request 
            const response = await fetch(`https://api.imagga.com/v2/tags?image_url=${imgUrl}`, {
                headers: {
                    'Authorization': 'Basic ' + btoa(import.meta.env.VITE_IMAGGA_API_KEY)
                }
            });

            if (!response.ok) {
                response.text().then(text => console.log('msg', text))
                throw new Error("Network response was not ok");
            }
            //Getting the data in form of array and slicing top 10 tags of the image
            const data = await response.json();
            setTagsArray(data.result.tags.slice(0, 10));
            setLoading(false);

        } catch (error) {

            console.error("Fetch error:", error);
            setLoading(false)
        }
    };


    //It will only render if in first page we choose an image from 6 of them when 
    //we will choose the image the render UI will change
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
    //If we have not selected an image then this page will render showing all the image option we are currently having
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