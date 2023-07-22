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


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} />
    <Route path='transform' element={<ImageTransformation />} />

    <Route path="*" element={<NotFound />} />
  </Route>
)
)
function App() {
  const [image, setImage] = useState(null)
  const onImageUpload = (childImage) => {
    setImage(childImage);
    console.log(childImage);
  }

  return (

    <RouterProvider router={router} />

  )
}

export default App
