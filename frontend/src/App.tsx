import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes/routes";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "./index.css";
import WaitingRoom from "./pages/WaitingRoom";
import AdminSearch from "./pages/AdminSearch";
import ProtectedRoute from "./routes/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import HomeRedirect from "./pages/HomeRedirect";
import Jam from "./pages/Jam";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import GlobalLoader from "./components/GlobalLoader";

function App() {
  return (
    <Router>
      <GlobalLoader />
      <Routes>
        <Route path={ROUTES.HOME} element={<HomeRedirect />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.REGISTER_ADMIN} element={<Register isAdmin />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.WAITING_ROOM}
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <WaitingRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_SEARCH}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.JAM}
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Jam />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute allowedRoles={["admin", "user"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.ACCESS_DENIED} element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
