import { useEffect, useState } from "react";
import { Navbar, Dialog, UserRow, LoadingSpinner } from "components";
import { API, axiosInstance } from "services";
import { useModal, usePageTitle } from "hooks";
import { User, UserRole } from "types";
import { useTranslation } from "react-i18next";

const UserManagement = () => {
  const { t } = useTranslation();
  usePageTitle(t("UserManagement.title"));

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);
  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();
  const [listUpdated, setListUpdated] = useState<number>(0);

  const changeRole = async (userId: string, oppositeRole: UserRole) => {
    try {
      await axiosInstance.put(
        API.USERS.CHANGE_USER_ROLE.replace(":id", userId),
        {
          role: oppositeRole,
        }
      );

      openDialog({
        type: "success",
        title: t("profile.dialog.title"),
        message: t("profile.dialog.instrumentMessage"),
        confirmLabel: t("profile.dialog.confirmLabel"),
        onConfirm: () => {
          closeDialog();
          setListUpdated((prev) => prev + 1);
        },
      });
    } catch (err: any) {
      alert(t("profile.generalError"));
    }
  };

  const deleteUser = async (userId: string, oppositeRole: UserRole) => {
    return;
  };

  const openDialogFunc = (user: User, isRole: boolean) => {
    const oppositeRole: UserRole = user.role === "admin" ? "user" : "admin";
    const title = isRole
      ? t("UserManagement.changeRole.dialog.title", {
          name: user.userName,
          role: oppositeRole,
        })
      : "";
    const message = isRole ? "" : t("navbar.logoutMessage");
    const confirmLabel = isRole
      ? t("UserManagement.changeRole.dialog.confirm")
      : "";
    const onConfirm = isRole
      ? () => changeRole(user._id, oppositeRole)
      : () => void {};

    openDialog({
      type: "warn",
      title,
      message,
      confirmLabel,
      onConfirm,
      onClose: closeDialog,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get<{ users: User[] }>(
          API.USERS.GET_USERS_LIST
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error(t("UserManagement.errorFetch"), err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [t, listUpdated]);

  if (isLoading)
    return <LoadingSpinner size="lg" text={t("UserManagement.loading")} />;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="px-6 py-10 max-w-5xl mx-auto font-sans">
        <h1 className="text-2xl font-bold text-primary mb-6">
          {t("UserManagement.title")}
        </h1>

        <div className="hidden sm:block">
          <UserRow isHeader />
        </div>

        <div className="space-y-4 mt-2">
          {users.map((user) => (
            <UserRow
              key={user._id}
              user={user}
              isMenuOpen={openMenuUserId === user._id}
              onOpenMenu={() =>
                setOpenMenuUserId(openMenuUserId === user._id ? null : user._id)
              }
              onChangeRole={() => openDialogFunc(user, true)}
            />
          ))}
        </div>
      </main>
      <Dialog isOpen={isDialogOpen} {...dialogData} />
    </div>
  );
};

export default UserManagement;
