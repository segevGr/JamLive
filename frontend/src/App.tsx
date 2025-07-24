import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES, ProtectedRoute } from "routes";
import "./index.css";
import { Register, Login, UserLobby, AdminLobby, Profile } from "pages";
import { AccessDenied, HomeRedirect, NotFound } from "utils";
import { GlobalLoader } from "components";

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
          path={ROUTES.USER_LOBBY}
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserLobby />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_LOBBY}
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLobby />
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
