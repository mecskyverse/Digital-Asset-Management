import { useState } from 'react'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link
} from "react-router-dom"
import Home from './pages/Home/Home'
import Layout from './components/ui/Layout'
import NotFound from './components/ui/NotFound'
import ImageTransformation from './pages/Transform/ImageTransformation'
import './index.css'
import Tag from './pages/Imagetagging/Tag'



function App() {
  const [image, setImage] = useState(null)
  const onImageUpload = (childImage) => {
    setImage(childImage);
    console.log('App', childImage);
  }
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home childImage={onImageUpload} image={image} />} />
      <Route path='transform' element={<ImageTransformation image={image} />} />
      <Route path='tagging' element={<Tag image={image} />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
  )
  return (

    <RouterProvider router={router} />

  )
}


export default App
