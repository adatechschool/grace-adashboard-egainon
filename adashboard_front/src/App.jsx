import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


useEffect(() => {
   const loadData = async () => {
    const res = await fetch("http://localhost:3000/themes");
    const data = await res.json();
    console.log(data);
 } 
 loadData();
}, []);

 


  return (
    <>
      
    </>
  )
}

export default App
