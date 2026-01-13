import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Themes from "./components/Themes"

function App() {

const [data, setData]= useState(null);



useEffect(() => {
    const loadData = async () => {
      try{
    const res = await fetch("http://localhost:3000/themes");
    setData(await res.json());
    }catch (error){
         console.error(error);
    }
  } 
 loadData();
}, []);



//phrase de chargement lors du loadData
 if(!data){
  return <h1>Chargement ...</h1>
 }
 console.log(data[0]);

 return(
  <>
  <Themes themes={data}/>
  </>
  //je passe la variable data au composant Themes sous le nom themes.
 )
  
}

export default App


