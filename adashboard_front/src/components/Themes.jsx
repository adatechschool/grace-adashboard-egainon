import { useState } from 'react'
import Skills from "./Skills"

function Themes({themes}) {

const [status, setStatus] = useState("");
  const deleteTheme = async (id) => {
    try {
      await fetch(`http://localhost:3000/themes/${id}`, {
        method: "DELETE",
      });
      setStatus("Suppression réussie");
    } catch (error) {
      setStatus("Échec de la suppression");
      console.error(error);
    }
  };
  return (
    <>
    {status ? <p>{status}</p> : null}
    
    {themes.map((theme) => (   //themes = {data}      
      <div key={theme.id}>
      <h2>{theme.name}</h2>
    
      <button onClick={() => deleteTheme(theme.id)}>Supprimer</button>
    

      <Skills skills={theme.skills}/>
      </div>
      //je passe la variable theme.skills au composant Skills sous le nom skills.
          )
        )}
    </>
  )
}


export default Themes
