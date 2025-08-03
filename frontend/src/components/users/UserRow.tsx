import { MoreHorizontal } from "lucide-react";
import { CardContainer } from "components";
import { User } from "types";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

interface Props {
  user?: User;
  isHeader?: boolean;
  onOpenMenu?: () => void;
  isMenuOpen?: boolean;
}

const UserRow = ({ user, isHeader = false, onOpenMenu, isMenuOpen }: Props) => {
  const { t } = useTranslation();

  const content = (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-x-10">
      <div className="min-w-0">
        {isHeader ? (
          <span className="text-sm text-gray-500 font-medium">
            {t("UserManagement.headers.userName")}
          </span>
        ) : (
          <>
            <div className="truncate font-semibold text-primary">
              {user!.userName}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {t("UserManagement.headers.createdAt")}
              {new Date(user!.createdAt).toLocaleDateString("he-IL")}
            </div>
          </>
        )}
      </div>

      <div className="text-sm text-gray-600 self-center">
        {isHeader ? t("UserManagement.headers.role") : user!.role}
      </div>

      <div className="text-sm text-gray-600 self-center">
        {isHeader ? t("UserManagement.headers.instrument") : user!.instrument}
      </div>

      <div className="flex relative self-center">
        {isHeader ? (
          <span className="text-sm text-gray-500 font-medium">
            {t("UserManagement.headers.activities")}
          </span>
        ) : (
          <>
            <button
              onClick={onOpenMenu}
              className="text-gray-600 hover:text-gray-900"
            >
              <MoreHorizontal size={18} />
            </button>
            {isMenuOpen && (
              <div
                className={clsx(
                  "absolute top-6 z-10 bg-white border rounded-md shadow-lg min-w-[7rem] w-fit",
                  isRtl() ? "right-0" : "left-0"
                )}
              >
                <button
                  className={clsx(
                    "px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap w-full",
                    isRtl() ? "text-right" : "text-left"
                  )}
                >
                  {user!.role === "admin"
                    ? t("UserManagement.headers.removeAdmin")
                    : t("UserManagement.headers.promote")}
                </button>
                <button
                  className={clsx(
                    "px-4 py-2 text-sm text-red-600 hover:bg-red-50 whitespace-nowrap w-full",
                    isRtl() ? "text-right" : "text-left"
                  )}
                >
                  {t("UserManagement.headers.deleteUser")}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return isHeader ? content : <CardContainer>{content}</CardContainer>;
};

export default UserRow;
