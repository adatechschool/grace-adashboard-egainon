function Skills({skills}) {
  return (
    <>
      <ul>
      {skills.map((skill) => ( //skills = {theme.skills} 
        <li key={skill.label}>
          <p>{skill.label}</p>
        </li>
            ))}
        </ul>
    </>
  )
}

export default Skills
