const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8081;

app.use(express.json({limit: '50mb'}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/status', (req, res) => {
    res.send('Everything is fine!');
});


app.post('/image', (req, res) => {
    const image = req.body.image;
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const filename = `image-${Date.now()}.png`;
    fs.writeFile(filename, base64Data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error saving image');
        } else {
            res.send(`https://digitalassetserver.onrender.com:${port}/${filename}`);
        }
    });
});

app.use(express.static('.'));

app.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
