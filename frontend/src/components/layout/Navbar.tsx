import { useState } from "react";
import { Music, User, LogOut, Users, Rewind } from "lucide-react";
import { logout, setMode, useAppDispatch, useAppSelector } from "store";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes";
import { useSocket } from "context/SocketProvider";
import { useModal } from "hooks";
import { ModeSwitch, Dialog } from "components";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

const Navbar = () => {
  const { t } = useTranslation();
  const [isLogoutOpen, openLogout, closeLogout, logoutData] = useModal();
  const [openNavbar, setOpenNavbar] = useState(false);
  const mode = useAppSelector((state) => state.ui.mode);

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

  const isInProfilePage = location.pathname === ROUTES.PROFILE;
  const isInManageUsers = false;

  const listButtons = [
    ...(isInProfilePage || isInManageUsers
      ? [
          {
            label: t("navbar.backToMain"),
            onClick: () => {
              setOpenNavbar(false);
              navigate(ROUTES.HOME);
            },
            icon: <Rewind />,
            role: ["user", "admin"],
          },
        ]
      : []),

    ...(!isInProfilePage
      ? [
          {
            label: t("navbar.profile"),
            onClick: () => {
              setOpenNavbar(false);
              navigate(ROUTES.PROFILE);
            },
            icon: <User />,
            role: ["user", "admin"],
          },
        ]
      : []),

    ...(role === "admin" && !isInManageUsers
      ? [
          {
            label: t("navbar.manageUsers"),
            onClick: () => {
              setOpenNavbar(false);
              // navigate(ROUTES.MANAGE_USERS);
            },
            icon: <Users />,
            role: ["admin"],
          },
        ]
      : []),

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

      <ModeSwitch
        className="hidden sm:inline-flex"
        mode={mode}
        onChange={(newMode) => dispatch(setMode(newMode))}
      />

      <div className="relative">
        <button
          className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
          onClick={() => setOpenNavbar(!openNavbar)}
        >
          <User className="text-primary" />
        </button>

        {openNavbar && (
          <div
            className={clsx(
              "absolute mt-2 bg-white rounded-md shadow-lg z-50 min-w-[11rem] w-fit px-1",
              isRtl() ? "left-0" : "right-0"
            )}
          >
            {listButtons
              .filter((button) => button.role.includes(role || ""))
              .map((button, index, array) => (
                <div key={button.label}>
                  <button
                    onClick={button.onClick}
                    className={clsx(
                      "w-full flex items-center gap-2 px-4 py-2 text-md font-medium hover:opacity-50 whitespace-nowrap min-w-full",
                      isRtl()
                        ? "flex-row-reverse text-right"
                        : "flex-row text-left",
                      button.label === t("navbar.logout")
                        ? "text-errorText"
                        : "text-primary"
                    )}
                  >
                    {button.icon}
                    <span>{button.label}</span>
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
