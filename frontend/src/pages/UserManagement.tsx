import { useEffect, useState } from "react";
import { Navbar, Dialog, UserRow, LoadingSpinner } from "components";
import { API, axiosInstance } from "services";
import { usePageTitle } from "hooks";
import { User } from "types";
import { useTranslation } from "react-i18next";

const UserManagement = () => {
  const { t } = useTranslation();

  usePageTitle(t("UserManagement.title"));

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get<{ users: User[] }>(
          API.USERS.GET_USERS_LIST
        );
        setUsers(res.data.users);
      } catch (err) {
        console.error("שגיאה בטעינת משתמשים:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
            />
          ))}
        </div>
      </main>

      <Dialog isOpen={false} />
    </div>
  );
};

export default UserManagement;
