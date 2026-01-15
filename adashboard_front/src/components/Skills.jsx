import { useEffect, useState } from 'react';

function Skills({skills, themeId}) {

  const [skillsList, setSkillsList] = useState([]);

 useEffect(() => {
    // À chaque fois que la prop skills change, MAJ du state local skillsList pour le synchroniser.
    setSkillsList(skills);
  }, [skills]);

   const updateStatus = async (skillIndex, newStatus) => {
   try {
    const formattedStatus = newStatus.toUpperCase();
      
      const response = await fetch(
        `http://localhost:3000/themes/${themeId}/skills/${skillIndex}/${formattedStatus}`,
        { method: "PUT" }
      );
      
      if (!response.ok) throw new Error("Erreur serveur");//Si la requête HTTP échoue on lance une erreur qui sera attrapée par le catch pour afficher le message d'erreur dans la console.

    const data = await response.json();     
    console.log("Réponse du serveur:", data); // vérifie si pris en compte

  // Mise à jour du state local pour re-render
  setSkillsList((prevSkills) =>
      prevSkills.map((skill, index) =>
      //Si l'index de la skill correspond à celui qu'on veut modifier, on retourne une copie de la skill avec le nouveau statut, sinon on retourne la skill inchangée.
        index === skillIndex ? { ...skill, status: newStatus } : skill 
        )
      );
    } catch (error) {
      console.error("Impossible de mettre à jour le statut :", error);
    }
  };


  return (
    <>
      <ul>
      {skillsList.map((skill, index) => ( //skills = {theme.skills} 
        <li key={skill.label}>
          <p>{skill.label}</p>
          <label>
          <select
              value={skill.status}
              onChange={(e) => updateStatus(index, e.target.value)}
            >
              <option value="KO">KO</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="OK">OK</option>
          </select>
          </label>
        </li>
            ))}
        </ul>
    </>
  )
}

export default Skills
