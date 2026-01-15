import { useState } from 'react'
import Skills from "./Skills"

function Themes({ themes, onThemeDeleted, onThemeAdded }) {

  const [status, setStatus] = useState("");
  const [value, setValue] = useState('');
  const [skillsInput, setSkillsInput] = useState('');
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

    const skillsArray = skillsInput //tableau propre de skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

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

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout");
      }

      const newTheme = await response.json();

      //reinitialisation du formulaire après ajout(vide champ value, champ skillsInput et fermeture du modal en mettant isModalOpen à false)
      setValue('');
      setSkillsInput('');
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
      <button onClick={() => setIsModalOpen(true)}>
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
              <label>Skills (séparées par des virgules)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
              />
            </div>

            <button type="submit">Ajouter</button>
            <button type="button" onClick={() => setIsModalOpen(false)}>
              Annuler
            </button>
          </form>
        </div>
      )}

      {/* LISTE DES THEMES */}
      {themes.map((theme) => (
        <div key={theme.id}>
          <h2>{theme.name}</h2>

          <button onClick={() => deleteTheme(theme.id)}>
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

export default Themes;
