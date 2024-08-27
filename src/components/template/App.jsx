import React from 'react'
import MainHeader from '../organisms/MainHeader'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>

    <div >
        <MainHeader />
        <Outlet/>
    </div>
    
    </>
  )
}

export default App
