import { useState } from 'react'
import Skills from "./Skills"

function Themes({themes, onThemeDeleted}) {

//pour delete par id
const [status, setStatus] = useState("");

  const deleteTheme = async (id) => {
    try {
      await fetch(`http://localhost:3000/themes/${id}`, {
        method: "DELETE",
      });
      setStatus("Suppression réussie");
      onThemeDeleted(id); // MAJ du state App : {handleThemeDelete}
    } catch (error) {
      setStatus("Échec de la suppression");
      console.error(error);
    }
  };


  
  return (
    <>
    {/* statut de la suppression du theme */}
    {status ? <p>{status}</p> : null}
    
    {themes.map((theme) => (   //themes = {data}      
      <div key={theme.id}>

      <h2>{theme.name}</h2>
    
    <button
    onClick={() => deleteTheme(theme.id)}>
    Supprimer
    </button>
    
      {/* je passe la variable theme.skills au composant Skills sous le nom skills. */}
      <Skills skills={theme.skills}/>
      
      </div>
      
          )
        )}
    </>
  )
}


export default Themes
