import { useState } from "react";

function App() {
  const [tools, setTools] = useState([
    { name: "", cost: "", user: "" }
  ]);

  const handleChange = (index, field, value) => {
    const update = [...tools];
    update[index][field] = value;
    setTools(update);
  };

  const addTool = () => {
    setTools([...tools, { name: "", cost: "", users: "" }])
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tools);
    alert("Data Submitted");
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1> AI Spend Audit Tool </h1>

      <form onSubmit={handleSubmit}>

        {tools.map((tool, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Tool Name"
              value={tool.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Cost"
              value={tool.cost}
              onChange={(e) => handleChange(index, "cost", e.target.value)}
            />
            <input
              type="text"
              placeholder="User"
              value={tool.user}
              onChange={(e) => handleChange(index, "user", e.target.value)}
            />
          </div>
        ))}

      </form>

    </div>
  );
}

export default App;