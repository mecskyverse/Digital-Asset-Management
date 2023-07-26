# Digital-Asset-Management

Digital Asset Management is a react-based web application which provides a one-stop solution to all the problems related to image handling. You can interact with the app here. <br>
👉 [Digital Asset Management](https://digital-asset-management.vercel.app/) 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Code Examples](#code-examples)
- [Tests](#tests)
- [Documentation](#documentation)
- [FAQ](#faq)
- [Contact Information](#contact-information)



## Installation 
To get started with the project, follow these steps:

1. **Clone the repository:**
2. **Navigate to the project directory:**
3. **Install dependencies using npm:**
4. **Run a local deployement**

   ```
   git clone https://github.com/mecskyverse/Digital-Asset-Management.git
   cd project-name
   npm install
   npm run dev

Open port 5173 on your localhost and you are good to go.<br>
For Demo purposes I have added .env in github files with the api key.

### Usage
* Upload an image through Drag And Drop.
* Image Cropping and Downloading.
* AI Powered Image Tagging.
* Currently Working On (Design Upgrade, Transform, Overlay, Padding, Focal Point, Image Optimization).

### Configuration
There is no additional configuration needed for running this app. I am using `Node version 18.16.0` and `NPM version 9.5.1` while building this project.<br>
Currently, the only thing needed is api key for imagga image api which I have shared in .env file. I know it should not be shared but this key is for demo purpose and you can use it.

### Code Examples
![digital-asset-management-working](https://github.com/mecskyverse/Digital-Asset-Management/assets/91150257/cb9ee3d3-47b4-445a-beea-c74a6c4441b8)
Through the above chart you can get a fair idea of how the app is currently working. We are currently using normal react hooks for state management which I am planning to update with Redux toolkit.
 As Optimization part was not explained in the image I am going to cover it here.  

#### Optimization 
Things like format conversion, compression or file changes will be done in this part. As per my research this task can be done via different methods like with vanilla javascriipt, using File API which is javascript's own API or via using a npm package or through HTML5 Canvas method. To challenge myself and as per our personalized need I have decided to go with the HTML5 Canvas method. 

The basic idea is to draw the image on a canvas, adjust its quality, and then convert the canvas data back to an image file. By doing this we can have a variable compression level. Same for the conversion we can again use the canvas and download the converted image into new format. 

### Tests
Currently, there are no unit tests or Integration test in the project. But I am planning to use jest as a platform for testing the web application. Jest also provides a test coverage report out of the box. So, we can have a better test coverage of our code.

### Documentation
I am going to use Docusaurus for documentation purposes. It is an open-source documentation website generator. It is designed to make it easy for developers to create, maintain, and deploy documentation websites for their projects.

### FAQs

#### What is My Project?

Its an digital asset management app which is currently being planned for managing images. All image related problem can have one stop solution. Format conversions, editing, padding, AI tagging. All of these can be done easily in browser itself. Although, I have started making this project for #TechSurf2023 but I am liking this project building no matter if I selected for next round or not I am going to complete this project.

#### I encountered an error during installation. What should I do?

Make sure you are using correct version of node and npm. For further assistance you can contact me.

#### Why have you added .env here?

I know that you should never leak your environment variables but for testing purposes for the judges to make it easy for them I open-sourced .env

### Contact
You can contact me through this platforms I am mostly active at this platforms.

[X](https://www.twitter.com/meckskyverse)
[Instagram](https://www.instagram.com/mecskyverse)

or you can contact me through my portfolio

[Portfolio](#).

