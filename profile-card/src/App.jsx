const skills = [
  {
    skill: "HTML+CSS",
    level: "advanced",
    color: "blue",
  },
  {
    skill: "JavaScript",
    level: "advanced",
    color: "yellow",
  },
  {
    skill: "Java",
    level: "advanced",
    color: "green",
  },
  {
    skill: "Web Design",
    level: "intermediate",
    color: "red",
  },
  {
    skill: "Git and GitHub",
    level: "intermediate",
    color: "cyan",
  },
  {
    skill: "React",
    level: "Beginner",
    color: "orange",
  },
];

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img src={`../public/jonas.jpeg`} className="avatar" />;
}

function Intro() {
  return (
    <>
      <h1>Jonas Schmedtmann</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </>
  );
}

function SkillList() {
  return (
    <ol className="skill-list">
      {skills.map((obj) => (
        <Skill skill={obj.skill} level={obj.level} color={obj.color} />
      ))}
    </ol>
  );
}

function Skill({ skill, level, color }) {
  return (
    <li className="skill" style={{ backgroundColor: color }}>
      {`${skill}${level === "advanced" ? "💪" : level === "intermediate" ? "👍" : "👶"}`}
      <span>{level === "beginner" && "👶"}</span>
      <span>{level === "intermediate" && "👍"}</span>
      <span>{level === "advanced" && "💪"}</span>
    </li>
  );
}

export default App;
