import { useState } from "react";
import { Music, User, LogOut } from "lucide-react";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useAppDispatch } from "../store/storeHooks";
import ModalDialog from "./ModalDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const confirmLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  return (
    <header className="bg-primary text-textOnDark flex items-center justify-between px-6 py-4 shadow-md relative">
      <div className="flex items-center gap-2">
        <Music className="text-gold" />
        <span className="font-bold text-lg text-gold">JAMOVEO</span>
      </div>

      <div className="relative">
        <button
          className="w-8 h-8 rounded-full bg-gold flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <User className="text-primary" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50">
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-errorText hover:opacity-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
      {showLogoutModal && (
        <ModalDialog
          isOpen={showLogoutModal}
          title="Log Out"
          message="Are you sure you want to log out?"
          confirmText="Yes, Logout"
          cancelText="Cancel"
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
