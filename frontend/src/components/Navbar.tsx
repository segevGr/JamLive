import { useState } from "react";
import { Music, User, LogOut, Users } from "lucide-react";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { useAppDispatch, useAppSelector } from "../store/storeHooks";
import ModalDialog from "./ModalDialog";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);
  const confirmLogout = () => {
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  const listButtons = [
    {
      label: "my profile",
      onClick: () => {},
      icon: <User />,
      role: ["user", "admin"],
    },
    {
      label: "manage users",
      onClick: () => {},
      icon: <Users />,
      role: ["admin"],
    },
    {
      label: "Logout",
      onClick: () => setShowLogoutModal(true),
      icon: <LogOut />,
      role: ["user", "admin"],
    },
  ];

  return (
    <header className="bg-primary text-textOnDark flex items-center justify-between px-6 py-4 shadow-md relative">
      <div className="flex items-center gap-2">
        <Music className="text-white" />
        <span className="font-bold text-lg text-white">JamLive</span>
      </div>

      <div className="relative">
        <button
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <User className="text-primary" />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
            {listButtons
              .filter((button) => button.role.includes(role || ""))
              .map((button, index, array) => (
                <div key={button.label}>
                  <button
                    onClick={button.onClick}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-md font-medium hover:opacity-50 ${
                      button.label === "Logout"
                        ? "text-errorText"
                        : "text-primary"
                    }`}
                  >
                    {button.icon}
                    {button.label}
                  </button>

                  {index < array.length - 1 && (
                    <div className="border-t border-gray-200 my-1" />
                  )}
                </div>
              ))}
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
