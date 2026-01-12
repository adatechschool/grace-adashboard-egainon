import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

const [data, setData]= useState([]);
// const [themes, setThemes]= useState("");

useEffect(() => {
   const loadData = async () => {
    const res = await fetch("http://localhost:3000/themes");
    setData(await res.json());
 } 
 loadData();
}, []);

//phrase de chargement lors du loadData
 if(!data){
  return <h1>Chargement ...</h1>
 }
 console.log(data[0]);

  return (
    <>
    {data.map((theme) => {
          return (
      <div key={theme.id}>
        <h2>{theme.name}</h2>
        <p>{theme.skills[0].label}</p>
        </div>
    )})
    }
    </>
  )
}

export default App
