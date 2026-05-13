import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AddTasks from "./pages/AddTasks";
import ListTasks from "./pages/ListTasks";
import DeleteHistory from "./pages/DeleteHistory";
import "./index.css";

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-tasks" element={<AddTasks />} />
        <Route path="/list-tasks" element={<ListTasks />} />
        <Route path="/delete-history" element={<DeleteHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
