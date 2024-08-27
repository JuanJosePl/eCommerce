import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'
import "./index.css"


createRoot(document.getElementById('root')).render(
  <RouterProvider router={ router }/>
)
