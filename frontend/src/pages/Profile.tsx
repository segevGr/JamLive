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
import { useAuthForm, usePageTitle, useModal } from "hooks";
import { validateInstrument, validatePasswordChange } from "utils/validation";
import { axiosInstance } from "constants/axios";
import { API } from "constants/api";
import { instruments, Instrument } from "types/instruments.types";

const SectionBorder = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className="border border-borderGray rounded-xl p-4">
    <h3 className="text-xl font-semibold text-primary mb-5">{title}</h3>
    {children}
  </div>
);

export default function Profile() {
  usePageTitle("Profile");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();

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
        instrument: selectedInstrument.toLowerCase(),
      });

      dispatch(changeInstrument({ instrument: selectedInstrument }));
      openDialog({
        type: "success",
        title: "Changes saved!",
        message: "Your instrument has been changed. Let’s start jamming!",
        confirmLabel: "Back to session",
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
          instrument: "The new instrument must be different",
        });
      } else {
        alert("Something went wrong\nPlease try again later");
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
        title: "Changes saved!",
        message: "Your password has been changed. Let’s start jamming!",
        confirmLabel: "Back to session",
        onConfirm: () => {
          closeDialog();
          navigate(ROUTES.HOME);
        },
      });
    } catch (err: any) {
      if (err.response?.data.message === "Current password is incorrect") {
        passwordForm.setErrors({
          currentPassword: "Current password is incorrect",
        });
      } else {
        alert("Something went wrong\nPlease try again later");
      }
    }
  };

  const handleDeleteAccount = async () => {
    const password = deleteForm.form.deletePassword.trim();

    if (!password) {
      deleteForm.setErrors({
        deletePassword: "Please enter your password to delete your account",
      });
      return;
    }
    try {
      await axiosInstance.delete(API.USERS.DELETE_USER, {
        data: { password },
      });
      closeDialog();
      openDialog({
        type: "success",
        title: "Goodbye!",
        message:
          "Your user has been successfully deleted. We hope you will be back soon!",
        confirmLabel: "End session",
        onConfirm: () => {
          closeDialog();
          navigate(ROUTES.LOGIN);
          dispatch(logout());
        },
      });
    } catch (err: any) {
      if (err.response?.data.message === "Current password is incorrect") {
        deleteForm.setErrors({
          deletePassword: "Current password is incorrect",
        });
      } else {
        alert("Something went wrong\nPlease try again later");
      }
    }
  };

  const openDeleteDialog = () => {
    openDialog({
      type: "warn",
      title: "Delete Account",
      message:
        "Enter your password to confirm account deletion. This action cannot be undone.",
      confirmLabel: "Delete",
      onClose: closeDialog,
    });
  };
  const isDeleteDialog = dialogData?.title === "Delete Account";
  return (
    <>
      <Navbar />
      <FormPageLayout
        title="Edit your details"
        subtitle={`Hello ${userName}!`}
        bottomLinkText="Back to session"
        onBottomLinkClick={() => navigate(ROUTES.HOME)}
      >
        <div className="space-y-10">
          <SectionBorder title="Change Instrument" key="instrument-form">
            <FormSection
              onSubmit={handleSaveInstrument}
              buttonText="Save instrument"
              isDisabled={currentInstrument === instrumentForm.form.instrument}
            >
              <InputField
                label="Choose a new instrument"
                name="instrument"
                value={instrumentForm.form.instrument}
                onChange={instrumentForm.handleChange}
                as="select"
                errorMessage={instrumentForm.errors.instrument}
              >
                {instruments.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </InputField>
            </FormSection>
          </SectionBorder>

          <SectionBorder title="Change Password" key="password-form">
            <FormSection
              onSubmit={handleSavePassword}
              buttonText="Update password"
              isDisabled={!areAllFieldsFilled}
            >
              <InputField
                label="Current password"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                value={passwordForm.form.currentPassword}
                onChange={passwordForm.handleChange}
                errorMessage={passwordForm.errors.currentPassword}
              />
              <InputField
                label="New password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                value={passwordForm.form.newPassword}
                onChange={passwordForm.handleChange}
                errorMessage={passwordForm.errors.newPassword}
              />
              <InputField
                label="Confirm new password"
                name="confirmNewPassword"
                type="password"
                placeholder="Confirm new password"
                value={passwordForm.form.confirmNewPassword}
                onChange={passwordForm.handleChange}
                errorMessage={passwordForm.errors.confirmNewPassword}
              />
            </FormSection>
          </SectionBorder>

          <SectionBorder title="Delete Account" key="Delete-Account-form">
            <p className="text-sm text-red-500 mb-2">
              Deleting your account is permanent and cannot be undone.
            </p>
            <PrimaryButton
              text="Delete my account"
              color="red"
              size="sm"
              onClick={openDeleteDialog}
              fullWidth={false}
            />
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
            placeholder="Password"
            value={deleteForm.form.deletePassword}
            onChange={deleteForm.handleChange}
            errorMessage={deleteForm.errors.deletePassword}
          />
        )}
      </Dialog>
    </>
  );
}
