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
- [Troubleshooting](#troubleshooting)
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
Things like format conversion, compression or file changes will be done in this part. As per my research this task can be via different methods like with vanilla javascriipt methods like using File API which is javascript's own API or via using a npm package or through an API. To challenge myself and as per our personalized need I have decided to go with the HTML5 Canvas method. 
