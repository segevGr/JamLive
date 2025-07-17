import { useNavigate } from "react-router-dom";
import { InputField, FormPageLayout, FormSection, Dialog } from "components";
import { API } from "constants/api";
import { useAuthForm, usePageTitle, useModal } from "hooks";
import { validateRegisterForm } from "utils/validation";
import { ROUTES } from "routes";
import { axiosInstance } from "constants/axios";
import { instruments } from "types/instruments.types";
import { useTranslation } from "react-i18next";

interface Props {
  isAdmin?: boolean;
}

export default function Register({ isAdmin = false }: Props) {
  const { t } = useTranslation();
  usePageTitle(t("register.pageTitle"));
  const navigate = useNavigate();
  const [isDialogOpen, openDialog, closeDialog, dialogData] = useModal();

  const { form, errors, setErrors, handleChange } = useAuthForm({
    userName: "",
    password: "",
    instrument: "",
  });

  const isFormValid =
    form.userName.trim() !== "" &&
    form.password.trim() !== "" &&
    form.instrument.trim() !== "";

  const validateForm = () => {
    const newErrors = validateRegisterForm(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    try {
      const formToSend = {
        ...form,
        instrument: form.instrument,
        userName: form.userName.toLowerCase(),
      };

      isAdmin
        ? await axiosInstance.post(API.AUTH.SIGNUP_ADMIN, formToSend)
        : await axiosInstance.post(API.AUTH.SIGNUP, formToSend);

      openDialog({
        type: "success",
        title: t("register.successTitle"),
        message: t("register.successMessage"),
        confirmLabel: t("register.successConfirm"),
        onConfirm: () => {
          closeDialog();
          navigate(ROUTES.LOGIN);
        },
      });
    } catch (err: any) {
      if (err.response?.data.message === "User already exists") {
        setErrors({
          userName: t("register.userExistsError"),
        });
      } else {
        alert(t("register.generalError"));
      }
    }
  };

  return (
    <>
      <FormPageLayout
        title={t("register.title")}
        subtitle={t("register.subtitle")}
        imageSrc="/register-img.png"
        isAdmin={isAdmin}
        bottomText={t("register.bottomText")}
        bottomLinkText={t("register.bottomLinkText")}
        onBottomLinkClick={() => navigate(ROUTES.LOGIN)}
      >
        <FormSection
          buttonText={t("register.buttonText")}
          isDisabled={!isFormValid}
          onSubmit={handleSubmit}
        >
          <InputField
            label={t("register.usernameLabel")}
            name="userName"
            placeholder={t("register.usernamePlaceholder")}
            value={form.userName}
            onChange={handleChange}
            errorMessage={errors.userName}
          />
          <InputField
            label={t("register.instrumentLabel")}
            name="instrument"
            value={form.instrument}
            onChange={handleChange}
            as="select"
            listPlaceholder={t("register.instrumentPlaceholder")}
            errorMessage={errors.instrument}
          >
            {instruments.map((inst) => (
              <option key={inst} value={inst}>
                {t(`instruments.${inst}`)}
              </option>
            ))}
          </InputField>
          <InputField
            label={t("register.passwordLabel")}
            name="password"
            type="password"
            placeholder={t("register.passwordPlaceholder")}
            value={form.password}
            onChange={handleChange}
            errorMessage={errors.password}
          />
        </FormSection>
      </FormPageLayout>

      <Dialog isOpen={isDialogOpen} {...dialogData} />
    </>
  );
}
