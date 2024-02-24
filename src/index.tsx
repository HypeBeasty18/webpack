

import { createRoot } from 'react-dom/client'
import App from './components/App'
import { createBrowserRouter } from 'react-router-dom'
import {RouterProvider} from "react-router-dom";
import { LazyAbout } from './pages/about/About.lazy';
import { LazyShop } from './pages/shop/Shop.lazy';
import {Suspense} from 'react'



const root = document.getElementById('root')


if (!root) {
  throw new Error('root not found')
}


const container = createRoot(root)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={'Loading...'}><App/></Suspense>,
    children: [
      {
        path: '/about',
        element: <Suspense fallback={'Loading...'}><LazyAbout/></Suspense> 
      },
      {
        path: '/shop',
        element: <LazyShop/>
      },
    ]
  },
])


container.render(
  <RouterProvider router={router}/>
)