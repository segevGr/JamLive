import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/admin" element={<div>Admin Main Page</div>} />
        <Route path="/player" element={<div>Player Main Page</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
