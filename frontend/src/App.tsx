import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES, ProtectedRoute } from "./routes";
import "./index.css";
import {
  Register,
  Login,
  WaitingRoom,
  AdminHomePage,
  Jam,
  Profile,
} from "pages";
import { AccessDenied, HomeRedirect, NotFound } from "utils";
import { GlobalLoader } from "components";
import { isRtl } from "i18n/getDirection";

function App() {
  return (
    <div dir={isRtl() ? "rtl" : "ltr"}>
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
            path={ROUTES.ADMIN_HOME_PAGE}
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminHomePage />
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
    </div>
  );
}

export default App;
