import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import WaitingRoom from "./pages/WaitingRoom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/waiting-room" element={<WaitingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
