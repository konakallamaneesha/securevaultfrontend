import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddPassword from "./pages/AddPassword";
import MasterVerify from "./pages/MasterVerify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddPassword />} />
        <Route path="/master" element={<MasterVerify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;