import { useNavigate } from "react-router-dom";
import {
  InputField,
  FormPageLayout,
  FormSection,
  PrimaryButton,
  Navbar,
  Dialog,
} from "components";
import {
  useAppDispatch,
  useAppSelector,
  changeInstrument,
  changeToken,
  logout,
} from "store";
import { ROUTES } from "routes";
import { useAuthForm, usePageTitle, useModal, useLanguage } from "hooks";
import { validateInstrument, validatePasswordChange } from "utils";
import { API, axiosInstance } from "services";
import { instruments, Instrument } from "types";
import { useTranslation } from "react-i18next";
import i18n from "i18n";

const SectionBorder = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="border border-borderGray rounded-xl p-4">
    <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
    {children}
  </div>
);

const Profile = () => {
  const { t } = useTranslation();
  usePageTitle(t("profile.pageTitle"));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();

  const { selectedLanguage, setSelectedLanguage, changeLanguage } =
    useLanguage();

  const { instrument, userName } = useAppSelector((state) => state.auth);
  const currentInstrument = instrument || "";

  const instrumentForm = useAuthForm({
    instrument: currentInstrument,
  });

  const passwordForm = useAuthForm({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const areAllFieldsFilled =
    passwordForm.form.currentPassword.trim() !== "" &&
    passwordForm.form.newPassword.trim() !== "" &&
    passwordForm.form.confirmNewPassword.trim() !== "";

  const deleteForm = useAuthForm({ deletePassword: "" });

  const handleSaveInstrument = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateInstrument(
      instrumentForm.form.instrument,
      currentInstrument
    );
    if (Object.keys(newErrors).length !== 0) {
      instrumentForm.setErrors(newErrors);
      return;
    }
    try {
      const selectedInstrument = instrumentForm.form.instrument as Instrument;

      await axiosInstance.put(API.USERS.CHANGE_INSTRUMENT, {
        instrument: selectedInstrument,
      });

      dispatch(changeInstrument({ instrument: selectedInstrument }));
      openDialog({
        type: "success",
        title: t("profile.dialog.title"),
        message: t("profile.dialog.instrumentMessage"),
        confirmLabel: t("profile.dialog.confirmLabel"),
        onConfirm: () => {
          closeDialog();
          navigate(ROUTES.HOME);
        },
      });
    } catch (err: any) {
      if (
        err.response?.data.message === "The new instrument must be different"
      ) {
        instrumentForm.setErrors({
          instrument: t("profile.sameInstrumentError"),
        });
      } else {
        alert(t("generalError"));
      }
    }
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validatePasswordChange(passwordForm.form);
    if (Object.keys(newErrors).length !== 0) {
      passwordForm.setErrors(newErrors);
      return;
    }

    try {
      const response = await axiosInstance.put(
        API.USERS.CHANGE_PASSWORD,
        passwordForm.form
      );
      const { token } = response.data;
      dispatch(changeToken({ token }));
      openDialog({
        type: "success",
        title: t("profile.dialog.title"),
        message: t("profile.dialog.passwordMessage"),
        confirmLabel: t("profile.dialog.confirmLabel"),
        onConfirm: () => {
          closeDialog();
          navigate(ROUTES.HOME);
        },
      });
    } catch (err: any) {
      if (err.response?.data.message === "Current password is incorrect") {
        passwordForm.setErrors({
          currentPassword: t("profile.currentPasswordIncorrect"),
        });
      } else {
        alert(t("generalError"));
      }
    }
  };

  const handleChangeLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    changeLanguage(selectedLanguage);
    openDialog({
      type: "success",
      title: t("profile.languageSection.successTitle"),
      message: t("profile.languageSection.successMessage"),
      confirmLabel: t("profile.languageSection.confirmLabel"),
      onConfirm: () => {
        closeDialog();
        navigate(ROUTES.HOME);
        window.location.reload();
      },
    });
  };

  const handleDeleteAccount = async () => {
    const password = deleteForm.form.deletePassword.trim();

    if (!password) {
      deleteForm.setErrors({
        deletePassword: t("profile.deleteDialog.error"),
      });
      return;
    }
    try {
      await axiosInstance.delete(API.USERS.DELETE_ME, {
        data: { password },
      });
      closeDialog();
      openDialog({
        type: "success",
        title: t("profile.deleted.title"),
        message: t("profile.deleted.message"),
        confirmLabel: t("profile.deleted.confirmLabel"),
        onConfirm: () => {
          closeDialog();
          navigate(ROUTES.LOGIN);
          dispatch(logout());
        },
      });
    } catch (err: any) {
      if (err.response?.data.message === "Current password is incorrect") {
        deleteForm.setErrors({
          deletePassword: t("profile.incorrectPassword"),
        });
      } else {
        alert(t("generalError"));
      }
    }
  };

  const openDeleteDialog = () => {
    openDialog({
      type: "warn",
      title: t("profile.deleteSection.title"),
      message: t("profile.deleteDialog.message"),
      confirmLabel: t("profile.deleteDialog.confirm"),
      onClose: closeDialog,
    });
  };

  const isDeleteDialog = dialogData?.title === t("profile.deleteSection.title");

  return (
    <>
      <Navbar />
      <FormPageLayout
        title={t("profile.title")}
        subtitle={t("profile.subtitle", { userName })}
        bottomLinkText={t("profile.backButton")}
        onBottomLinkClick={() => navigate(ROUTES.HOME)}
      >
        <div className="space-y-10">
          <SectionBorder title={t("profile.instrumentSection.title")}>
            <FormSection
              onSubmit={handleSaveInstrument}
              buttonText={t("profile.instrumentSection.save")}
              isDisabled={currentInstrument === instrumentForm.form.instrument}
            >
              <InputField
                label={t("profile.instrumentSection.label")}
                name="instrument"
                value={instrumentForm.form.instrument}
                onChange={instrumentForm.handleChange}
                as="select"
                errorMessage={instrumentForm.errors.instrument}
              >
                {instruments.map((inst) => (
                  <option key={inst} value={inst}>
                    {t(`instruments.${inst}`)}
                  </option>
                ))}
              </InputField>
            </FormSection>
          </SectionBorder>

          <SectionBorder title={t("profile.passwordSection.title")}>
            <FormSection
              onSubmit={handleSavePassword}
              buttonText={t("profile.passwordSection.save")}
              isDisabled={!areAllFieldsFilled}
            >
              <InputField
                label={t("profile.passwordSection.currentLabel")}
                name="currentPassword"
                type="password"
                placeholder={t("profile.passwordSection.currentPlaceholder")}
                value={passwordForm.form.currentPassword}
                onChange={passwordForm.handleChange}
                errorMessage={passwordForm.errors.currentPassword}
              />
              <InputField
                label={t("profile.passwordSection.newLabel")}
                name="newPassword"
                type="password"
                placeholder={t("profile.passwordSection.newPlaceholder")}
                value={passwordForm.form.newPassword}
                onChange={passwordForm.handleChange}
                errorMessage={passwordForm.errors.newPassword}
              />
              <InputField
                label={t("profile.passwordSection.confirmLabel")}
                name="confirmNewPassword"
                type="password"
                placeholder={t("profile.passwordSection.confirmPlaceholder")}
                value={passwordForm.form.confirmNewPassword}
                onChange={passwordForm.handleChange}
                errorMessage={passwordForm.errors.confirmNewPassword}
              />
            </FormSection>
          </SectionBorder>

          <SectionBorder title={t("profile.languageSection.title")}>
            <FormSection
              onSubmit={handleChangeLanguage}
              buttonText={t("profile.languageSection.save")}
              isDisabled={selectedLanguage === i18n.language}
            >
              <InputField
                label={t("profile.languageSection.selectLabel")}
                name="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                as="select"
              >
                <option value="en">
                  {t("profile.languageSection.options.en")}
                </option>
                <option value="he">
                  {t("profile.languageSection.options.he")}
                </option>
              </InputField>
            </FormSection>
          </SectionBorder>

          <SectionBorder title={t("profile.deleteSection.title")}>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-red-500 self-start">
                {t("profile.deleteSection.warning")}
              </p>
              <div className="self-end">
                <PrimaryButton
                  text={t("profile.deleteSection.button")}
                  color="red"
                  size="sm"
                  onClick={openDeleteDialog}
                  fullWidth={false}
                />
              </div>
            </div>
          </SectionBorder>
        </div>
      </FormPageLayout>

      <Dialog
        isOpen={isDialogOpen}
        {...dialogData}
        confirmDisabled={
          isDeleteDialog && deleteForm.form.deletePassword.trim() === ""
        }
        onConfirm={isDeleteDialog ? handleDeleteAccount : dialogData?.onConfirm}
      >
        {isDeleteDialog && (
          <InputField
            name="deletePassword"
            type="password"
            placeholder={t("profile.deleteDialog.placeholder")}
            value={deleteForm.form.deletePassword}
            onChange={deleteForm.handleChange}
            errorMessage={deleteForm.errors.deletePassword}
          />
        )}
      </Dialog>
    </>
  );
};

export default Profile;
