import React, { useEffect, useState } from 'react'
import LightButton from '../../components/LightButton'
import { useSelector } from 'react-redux';
import DragandDrop from '../../components/DragandDrop';
function Tag() {
    const [selectedImage, setSelectedImage] = useState(null); //keep track of weather we have selected an image or not
    const [tagsArray, setTagsArray] = useState();//keep track of have we got the tags array from imagga api
    const [loading, setLoading] = useState({
        uploading: false,
        fetching: false
    });//will change the ui when we are calling fetch function
    const [imageUrl, setImageUrl] = useState(null);
    const [trial, setTrial] = useState({
        showDemo: false,
        showNothing: true,
        showFinalImage: false
    });
    const imageData = useSelector((state) => state.image.imageData);
    const url = 'https://digitalassetserver.onrender.com/image'
    //All the photos array to use in map function for rendering.

    const photos = [
        'car.jpg',
        'desk.jpg',
        'mountain.jpg',
        'team.jpg',
        'Universe.jpg',
        'waterfall.jpg'
    ]

    //getting this image url from github and sending this to imagga api with GET request and response we are getting tags for the relevant image If the image is not uploaded then this images is for demo purposes.

    useEffect(() => {
        setImageUrl(`https://raw.githubusercontent.com/mecskyverse/Digital-Asset-Management/main/public/Demo-images/${selectedImage}`)
    }, [selectedImage])

    const handleSelectedPhoto = (photo) => {
        setSelectedImage(photo);
        setTrial({
            showDemo: false,
            showNothing: false,
            showFinalImage: true
        })
        console.log('handle selecte click')
    }

    const handleTagsClick = async () => {
        if (imageData != null) {
            setLoading({
                uploading: true,
                fetching: false
            });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            })
            if (!response.ok) {
                response.text().then(text => console.log('msg', text))
                throw new Error("Network response was not ok")
            }
            const data = await response.text();
            console.log(data)
            setLoading({
                uploading: false,
                fetching: true
            });
            fetchData(data);
        }
        else {
            setLoading({
                uploading: false,
                fetching: true
            });
            fetchData(imageUrl)
        }
    }
    const fetchData = async (data) => {
        const url = data;
        try {
            console.log('sending request', url)
            //sending the GET request 
            const response = await fetch(`https://api.imagga.com/v2/tags?image_url=${url}`, {
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
            setLoading({
                uploading: false,
                fetching: false
            });

        } catch (error) {

            console.error("Fetch error:", error);
            setLoading(false)
        }
    };



    if (imageData == null && trial.showNothing == true) {

        return (
            <div className='bg-edit w-full h-[93vh] flex flex-col items-center gap-10 justify-center'>
                <div className='flex flex-col justify-center items-center'>
                    <div className='text-3xl text-center mt-5'>You have not uploaded Image Please Upload! </div>
                    <div className='text-3xl text-center'>OR</div>
                    <LightButton text='Use Demo Images' onClick={() => setTrial({
                        showDemo: true,
                        showNothing: false,
                        showFinalImage: false
                    })} />
                </div>
                <DragandDrop />
            </div>
        )

    }
    //This section is for showing demo images 
    if (trial.showDemo == true) {
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
                            onClick={() => handleSelectedPhoto(photo)}

                        />

                    ))}
                </div>
            </div>
        )
    }
    //This section will only be render if we select something from demo images or if we have uploaded our own image
    if (imageData || trial.showFinalImage == true) {
        return (


            <div className='h-[93vh] bg-cyan-100 border-red-800  items-center'>
                <h1 className="text-5xl font-extrabold tracking-tight bg-cyan-100 text-center pt-7 pb-5">
                    AI-Powered Image Analysis and Tagging
                </h1>
                <div className='flex flex-row'>
                    <img src={imageData != null ? imageData : `Demo-images/${selectedImage}`} className='w-1/2 max-h-[93vh] rounded-xl m-5 self-center' />
                    <div className='w-1/2 h-96 place-self-center flex justify-center items-center'>
                        {!tagsArray && (loading.uploading ? <LightButton text="uploading..." /> : loading.fetching ? <LightButton text="fetching..." /> : <LightButton text="Get Tags" onClick={handleTagsClick} />

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
            </div>

        )
    }


};


export default Tag