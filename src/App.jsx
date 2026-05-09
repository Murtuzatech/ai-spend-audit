import { useEffect, useState } from "react";

function App() {
  const [tools, setTools] = useState(() => {
    const savedTools = localStorage.getItem("ai-tools");

    return savedTools
      ? JSON.parse(savedTools)
      : [{ name: "", cost: "", users: "" }];
  });

  const [totalCost, setTotalCost] = useState(0);

  // Save data in local storage
  useEffect(() => {
    localStorage.setItem("ai-tools", JSON.stringify(tools));
  }, [tools]);

  // Handle Input Change
  const handleChange = (index, field, value) => {
    const update = [...tools];
    update[index][field] = value;
    setTools(update);
  };

  // Add Tool
  const addTool = () => {
    setTools([...tools, { name: "", cost: "", users: "" }]);
  };

  // Remove Tool
  const removeTool = (index) => {
    const filteredTools = tools.filter((_, i) => i !== index);

    if (filteredTools.length === 0) {
      setTools([{ name: "", cost: "", users: "" }]);
    } else {
      setTools(filteredTools);
    }
  };

  // Calculate Total
  const calculateAudit = (e) => {
    e.preventDefault();

    const isEmpty = tools.some(
      (tool) => !tool.name || !tool.cost || !tool.users
    );

    if (isEmpty) {
      alert("Please fill all fields");
      return;
    }

    const total = tools.reduce(
      (acc, tool) => acc + (Number(tool.cost) || 0),
      0
    );

    setTotalCost(total);
  };

  return (
    <div className="min-h-screen bg-[#030712] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black text-white p-6 md:p-12 flex flex-col items-center font-sans">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 bg-clip-text text-transparent mb-4">
          AI Spend Audit
        </h1>

        <p className="text-gray-400 text-lg">
          Stop overpaying for AI. Audit your subscriptions now.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)]">
        
        <form onSubmit={calculateAudit} className="space-y-6">

          {tools.map((tool, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 relative"
            >
              {/* Tool Name */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                  Tool Name
                </label>

                <input
                  className="bg-black/40 border border-white/10 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
                  placeholder="e.g. ChatGPT Plus"
                  value={tool.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                />
              </div>

              {/* Cost */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                  Monthly Cost ($)
                </label>

                <input
                  className="bg-black/40 border border-white/10 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
                  type="number"
                  placeholder="20"
                  value={tool.cost}
                  onChange={(e) =>
                    handleChange(index, "cost", e.target.value)
                  }
                />
              </div>

              {/* Users */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">
                  Seats/Users
                </label>

                <input
                  className="bg-black/40 border border-white/10 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-600"
                  type="number"
                  placeholder="1"
                  value={tool.users}
                  onChange={(e) =>
                    handleChange(index, "users", e.target.value)
                  }
                />
              </div>

              {/* Remove Button */}
              <div className="flex items-end pb-1">
                <button
                  type="button"
                  onClick={() => removeTool(index)}
                  className="w-full px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 rounded-xl text-xs font-bold transition-all">
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            
            <button
              type="button"
              onClick={addTool}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-bold"
            >
              + Add Tool
            </button>

            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Calculate My Savings
            </button>
          </div>
        </form>

        {/* Result */}
        {totalCost > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            
            <h2 className="text-gray-400 font-medium mb-2">
              Estimated Annual Expenditure
            </h2>

            <div className="text-6xl font-black text-white tracking-tighter">
              ${totalCost * 12}

              <span className="text-blue-500 text-2xl ml-2">
                /year
              </span>
            </div>

            <p className="mt-4 text-blue-400 font-medium">
              Based on {tools.length} active AI tools.
            </p>

            {totalCost > 100 && (
              <div className="mt-6 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 p-4 rounded-2xl">
                ⚠️ You may be overspending on AI subscriptions.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-20 text-gray-600 text-sm">
        Murtuza Hussain • AI Spend Audit Project
      </footer>
    </div>
  );
}

export default App;