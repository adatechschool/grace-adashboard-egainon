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

// supprimer theme dans le state
  const handleThemeDelete = (id) => {
    setData((prevData) =>
      prevData.filter((theme) => theme.id !== id)
    );
  };

//phrase de chargement lors du loadData (utile pour voir si back connecté)
 if(!data){
  return <h1>Chargement ...</h1>
 }
 console.log(data[0]);

 return(
  <>
   {/* je passe la variable data au composant Themes sous le nom themes. */}
  <Themes 
  themes={data}
  onThemeDeleted={handleThemeDelete}/>
  </>
 
 )
  
}

export default App


