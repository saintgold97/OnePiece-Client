import React, { useState } from 'react'
import { Title } from '../Title/Title'
import "./Home.css"

export const Home = () => {
  const [title, setTitle] = useState("Home")
  
  return (
  <div className='home'>
    <Title className='overlay-home' title={title}/>
  </div>
  )
}
