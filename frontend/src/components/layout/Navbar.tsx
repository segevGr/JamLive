import { useState } from "react";
import { Music, User, LogOut, Users } from "lucide-react";
import { logout, useAppDispatch, useAppSelector } from "store";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes";
import { useSocket } from "context/SocketProvider";
import { useModal } from "hooks";
import { Dialog } from "../dialogs";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const [isLogoutOpen, openLogout, closeLogout, logoutData] = useModal();
  const [openNavbar, setOpenNavbar] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);
  const { socket } = useSocket();
  const location = useLocation();

  const confirmLogout = () => {
    if (role === "admin" && location.pathname === "/jam") {
      socket?.emit("quitSession");
    }
    dispatch(logout());
    navigate(ROUTES.HOME);
  };

  const listButtons = [
    {
      label: t("navbar.profile"),
      onClick: () => {
        setOpenNavbar(false);
        navigate(ROUTES.PROFILE);
      },
      icon: <User />,
      role: ["user", "admin"],
    },
    {
      label: t("navbar.manageUsers"),
      onClick: () => {
        setOpenNavbar(false);
      },
      icon: <Users />,
      role: ["admin"],
    },
    {
      label: t("navbar.logout"),
      onClick: () => {
        setOpenNavbar(false);
        openLogout({
          type: "warn",
          title: t("navbar.logoutTitle"),
          message: t("navbar.logoutMessage"),
          confirmLabel: t("navbar.logoutConfirm"),
          onConfirm: confirmLogout,
          onClose: closeLogout,
        });
      },
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
          onClick={() => setOpenNavbar(!openNavbar)}
        >
          <User className="text-primary" />
        </button>

        {openNavbar && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
            {listButtons
              .filter((button) => button.role.includes(role || ""))
              .map((button, index, array) => (
                <div key={button.label}>
                  <button
                    onClick={button.onClick}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-md font-medium hover:opacity-50 ${
                      button.label === t("navbar.logout")
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
      <Dialog isOpen={isLogoutOpen} {...logoutData} />
    </header>
  );
};

export default Navbar;
