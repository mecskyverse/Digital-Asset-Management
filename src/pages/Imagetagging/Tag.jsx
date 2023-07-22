import React, { useEffect } from 'react'

function Tag({ image }) {
    const apiKey = "YOUR_API_KEY";
    console.log('Tag', image)
    const blob = new Blob([image], { type: "image/png" }); // Change the type if your data is of a different format

    // Create a downloadable URL for the Blob
    const url = URL.createObjectURL(blob);
    console.log('Tagging', url)
    const imageUrl =
        "https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg";
    const apiUrl = `https://api.imagga.com/v2/tags?image_url=${url}`
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        Authorization: `Basic ${btoa(`acc_a278fd3f6c62f78:eb085c7a646dfb49c07861593155b1e3`)}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log(data); // Process the API response data here
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        // fetchData();
    }, []);
    return (
        <div>Fetching data...</div>
    )
};


export default Tag