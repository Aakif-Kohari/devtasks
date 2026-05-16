import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const AddTasks = () => {
  const { dark } = useTheme();
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("FEATURE");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      category,
      completed: false,
    };

    setTasks([...tasks, newTask]);

    toast.success("Task successfully added to roadmap.", {
      style: { background: "#000000", color: "#ffffff" },
    });

    setTask("");
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 selection:bg-black selection:text-white font-sans antialiased transition-colors duration-300 ${dark ? "bg-zinc-950" : "bg-[#FDFDFD]"}`}>
      <div className={`w-full max-w-[480px] rounded-5xl p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.06)] border flex flex-col items-center text-center relative overflow-hidden transition-colors duration-300 ${dark ? "bg-zinc-900 border-zinc-700" : "bg-white border-neutral-100"}`}>
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-black dark:bg-white" />

        {/* Theme Toggle */}
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="space-y-3 mt-5 mb-12">
          <h1 className={`text-4xl font-black tracking-tight uppercase ${dark ? "text-white" : "text-black"}`}>
            Add Task
          </h1>
          <p className="text-neutral-400 font-medium text-lg">
            What's on your mind today?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-8">
          <div className="relative group text-left">
            <label
              htmlFor="task-input"
              className="block text-[11px] font-black text-neutral-400 uppercase tracking-[0.25em] mb-3 ml-6"
            >
              Task Description
            </label>

            <input
              id="task-input"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="e.g. Optimize database queries"
              className={`w-full border-2 border-transparent rounded-4xl px-8 py-5 placeholder:text-neutral-300 focus:border-current transition-all duration-300 outline-none font-semibold text-lg shadow-sm ${dark ? "bg-zinc-800 text-white focus:bg-zinc-700" : "bg-neutral-50 text-black focus:bg-white focus:border-black"}`}
              autoFocus
            />
          </div>

          <div className="text-left">
            <label className="block text-[11px] font-black text-neutral-400 uppercase tracking-[0.25em] mb-3 ml-6">
              Category
            </label>

            <div className="flex items-center gap-3 ml-6">
              {["FEATURE", "BUG", "REFACTOR"].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setCategory(opt)}
                  className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer border ${
                    category === opt
                      ? "bg-black text-white border-black"
                      : dark
                      ? "bg-zinc-700 text-neutral-300 border-transparent hover:bg-zinc-600"
                      : "bg-neutral-100 text-neutral-600 border-transparent hover:bg-neutral-200"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className={`group w-full font-black py-6 rounded-4xl shadow-2xl active:scale-[0.98] transition-all duration-500 flex items-center justify-center space-x-4 text-xl tracking-wide ${dark ? "bg-white text-black hover:bg-gray-100 shadow-white/20" : "bg-black text-white hover:bg-neutral-800 shadow-black/40"}`}
          >
            <span>CREATE TASK</span>

            <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-1 transition-transform duration-300">
              <svg
                className={`w-6 h-6 ${dark ? "text-black" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </button>
        </form>

        <Link
          to="/dashboard"
          className={`mt-12 font-bold text-sm uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 ${dark ? "text-neutral-400 hover:text-white" : "text-neutral-400 hover:text-black"}`}
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Decorative Blur Elements */}
      <div className={`fixed top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] -z-10 opacity-60 ${dark ? "bg-zinc-800" : "bg-neutral-100"}`} />
      <div className={`fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] -z-10 opacity-60 ${dark ? "bg-zinc-900" : "bg-neutral-50"}`} />
    </div>
  );
};

export default AddTasks;
