import { useState } from 'react'
import Skills from "./Skills"

function Themes({ themes, onThemeDeleted, onThemeAdded }) {

  const [status, setStatus] = useState("");
  const [value, setValue] = useState('');
  const [skillsList, setSkillsList] = useState([]); // tableau de skills {label, validation}
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DELETE
  const deleteTheme = async (id) => {
    try {
      await fetch(`http://localhost:3000/themes/${id}`, {
        method: "DELETE",
      });
      setStatus("Suppression réussie");
      onThemeDeleted(id);
    } catch (error) {
      setStatus("Échec de la suppression");
      console.error(error);
    }
  };

  // POST
  const addTheme = async () => {
    if (!value.trim()) return;
    const skillsArray = skillsList
      .filter(s => s.label.trim()) // garde seulement les skills non vides
      .map(s => ({
      label: s.label.trim(),
      validation: s.validation
    }));

    try {
      const response = await fetch("http://localhost:3000/themes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //transformation un objet JavaScript en chaîne JSON afin de l’envoyer correctement dans le corps (body) d’une requête HTTP
        body: JSON.stringify({
          name: value,
          skills: skillsArray,
        }),
      });

    // Vérifie que la réponse contient du JSON
    let newTheme = null;
    const text = await response.text(); // récupère la réponse brute
    if (text) {
      newTheme = JSON.parse(text); // parse seulement si ce n'est pas vide
      console.log("Thème ajouté :", newTheme);
    } else {
      console.log("Thème ajouté (backend ne renvoie rien)");
    }

    //reinitialisations du formulaire après ajout(vide champs et fermeture du modal en mettant isModalOpen à false) : reset
    setValue("");
    setSkillsList([]);
    setIsModalOpen(false);

      if (onThemeAdded) {
        onThemeAdded(newTheme);
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {/* statut suppression */}
      {status && <p>{status}</p>}

      {/* bouton ouverture modale */}
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setIsModalOpen(true)}>
        Ajouter un thème
      </button>

      {/* MODALe */}
      {isModalOpen && (
        <div>
          <h3>Nouveau thème</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTheme();
            }}
          >
            <div>
              <label>Nom</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>

            <div>
            <label>Skills</label> 
            {/* Liste des champs de skills */}
            {skillsList.map((skill, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={skill.label}
                  onChange={(e) => {
                  const newList = [...skillsList];
                  newList[index].label = e.target.value;
                  setSkillsList(newList);
                }}
                placeholder="Nom du skill"
              />
              <select
                  value={skill.validation}
                  onChange={(e) => {
                  const newList = [...skillsList];
                  newList[index].validation = e.target.value;// modifie la propriété validation de l'élément à la position index avec la nouvelle valeur sélectionnée
                  setSkillsList(newList);
                  }}
                >
                <option value="KO">KO</option>
                <option value="PROGRESS">PROGRESS</option>
                <option value="OK">OK</option>
              </select>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="button" 
                onClick={() => {
                  setSkillsList(skillsList.filter((skill, i) => i !== index));//MAJ liste des skills en supprimant celui dont l’index correspond à index, en gardant tous les autres.
                }}
                
              >
                ✕
              </button>
            </div>
            ))}

        {/* Bouton pour ajouter un nouveau champ */}
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button" 
          onClick={() => {
            setSkillsList([...skillsList, { label: '', validation: 'KO' }]);
          }}
        >
          Ajouter un skill
        </button>
        </div>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="submit">Ajouter</button>
            <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"type="button" onClick={() => setIsModalOpen(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}

      {/* LISTE DES THEMES */}
      {themes.map((theme) => (
        <div key={theme.id}>
          <h2>{theme.name}</h2>

          <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => deleteTheme(theme.id)}>
            Supprimer
          </button>

          <Skills
            skills={theme.skills}
            themeId={theme.id}
          />
        </div>
      ))}
    </>
  );
}

export default Themes
