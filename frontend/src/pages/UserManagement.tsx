import { useEffect, useState } from "react";
import { Navbar, Dialog, UserRow } from "components";
import { API, axiosInstance } from "services";
import { useModal, usePageTitle } from "hooks";
import { User, UserRole } from "types";
import { useTranslation } from "react-i18next";

const UserManagement = () => {
  const { t } = useTranslation();
  usePageTitle(t("UserManagement.title"));

  const [users, setUsers] = useState<User[]>([]);
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);
  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();
  const [listUpdated, setListUpdated] = useState<number>(0);

  const changeRole = async (
    userId: string,
    userName: string,
    oppositeRole: UserRole
  ) => {
    try {
      await axiosInstance.put(
        API.USERS.CHANGE_USER_ROLE.replace(":id", userId),
        {
          role: oppositeRole,
        }
      );

      openDialog({
        type: "success",
        message: t("UserManagement.dialogs.changeRole.successMessage", {
          name: userName,
        }),
        confirmLabel: t("UserManagement.dialogs.changeRole.confirmSuccess"),
        onConfirm: () => {
          closeDialog();
          setListUpdated((prev) => prev + 1);
        },
      });
    } catch (err: any) {
      alert(t("generalError"));
    }
  };

  const deleteUser = async (userId: string, userName: string) => {
    try {
      await axiosInstance.delete(API.USERS.DELETE_USER.replace(":id", userId));

      openDialog({
        type: "success",
        message: t("UserManagement.dialogs.deleteUser.successMessage", {
          name: userName,
        }),
        confirmLabel: t("UserManagement.dialogs.deleteUser.confirmSuccess"),
        onConfirm: () => {
          closeDialog();
          setListUpdated((prev) => prev + 1);
        },
      });
    } catch (err: any) {
      alert(t("generalError"));
    }
  };

  const openDialogFunc = (user: User, isRole: boolean) => {
    const { userName, _id: userId, role } = user;

    if (isRole) {
      const oppositeRole: UserRole = role === "admin" ? "user" : "admin";

      openDialog({
        type: "warn",
        title: t("UserManagement.dialogs.changeRole.title", {
          name: userName,
          role: oppositeRole,
        }),
        confirmLabel: t("UserManagement.dialogs.changeRole.confirmAction"),
        onConfirm: () => changeRole(userId, userName, oppositeRole),
        onClose: closeDialog,
      });
      return;
    }

    openDialog({
      type: "warn",
      title: t("UserManagement.dialogs.deleteUser.title", {
        name: userName,
      }),
      message: t("UserManagement.dialogs.deleteUser.actionMessage"),
      confirmLabel: t("UserManagement.dialogs.deleteUser.confirmAction"),
      onConfirm: () => deleteUser(userId, userName),
      onClose: closeDialog,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get<{ users: User[] }>(
          API.USERS.GET_USERS_LIST
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error(t("UserManagement.errorFetch"), err);
      }
    };

    fetchUsers();
  }, [t, listUpdated]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="px-6 py-10 max-w-5xl mx-auto font-sans">
        <h1 className="text-2xl font-bold text-primary mb-6">
          {t("UserManagement.title")}
        </h1>

        <UserRow isHeader />

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
              onDeleteUser={() => openDialogFunc(user, false)}
            />
          ))}
        </div>
      </main>
      <Dialog isOpen={isDialogOpen} {...dialogData} />
    </div>
  );
};

export default UserManagement;
