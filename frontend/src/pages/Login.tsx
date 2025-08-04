import { useNavigate } from "react-router-dom";
import { useAppDispatch, login } from "store";
import {
  InputField,
  FormPageLayout,
  FormSection,
  LanguageToggle,
  PrimaryButton,
  Dialog,
} from "components";
import { API, axiosInstance } from "services";
import { useAuthForm, useModal, usePageTitle } from "hooks";
import { validateLoginForm } from "utils/validation";
import { ROUTES } from "routes";
import { useTranslation } from "react-i18next";
import { isRtl } from "i18n/getDirection";
import clsx from "clsx";

const Login = () => {
  const { t } = useTranslation();
  usePageTitle(t("login.pageTitle"));
  const [isHelpOpen, openHelp, closeHelp, helpData] = useModal();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { form, errors, setErrors, handleChange } = useAuthForm({
    userName: "",
    password: "",
  });

  const isFormValid =
    form.userName.trim() !== "" && form.password.trim() !== "";

  const validateForm = () => {
    const newErrors = validateLoginForm(form);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validateForm()) return;

    const formToSend = {
      ...form,
      userName: form.userName.toLowerCase(),
    };

    try {
      const res = await axiosInstance.post(API.AUTH.LOGIN, formToSend);
      dispatch(
        login({
          userName: res.data.user.userName,
          userId: res.data.user.id,
          role: res.data.user.role,
          token: res.data.access_token,
          instrument: res.data.user.instrument,
        })
      );
      navigate(
        res.data.user.role === "admin" ? ROUTES.ADMIN_LOBBY : ROUTES.USER_LOBBY
      );
    } catch (err: any) {
      if (err.response?.data.message === "Incorrect userName or password") {
        setErrors({
          password: t("login.invalidCredentials"),
        });
      } else {
        alert(t("generalError"));
      }
    }
  };

  const openDialog = () => {
    openHelp({
      type: "success",
      title: t("login.dialog.title"),
      message: t("login.dialog.message"),
      confirmLabel: t("login.dialog.confirmLabel"),
      onConfirm: closeHelp,
    });
  };

  return (
    <>
      <LanguageToggle />
      <FormPageLayout
        title={t("login.title")}
        subtitle={t("login.subtitle")}
        imageSrc="/login-img.png"
        bottomText={t("login.noAccountText")}
        bottomLinkText={t("login.registerLinkText")}
        onBottomLinkClick={() => navigate(ROUTES.REGISTER)}
      >
        <FormSection
          buttonText={t("login.buttonText")}
          isDisabled={!isFormValid}
          onSubmit={handleSubmit}
        >
          <InputField
            label={t("login.usernameLabel")}
            name="userName"
            placeholder={t("login.usernamePlaceholder")}
            value={form.userName}
            onChange={handleChange}
            errorMessage={errors.userName}
          />
          <InputField
            label={t("login.passwordLabel")}
            name="password"
            type="password"
            placeholder={t("login.passwordPlaceholder")}
            value={form.password}
            onChange={handleChange}
            errorMessage={errors.password}
          />
        </FormSection>
      </FormPageLayout>
      <div
        className={clsx(
          "absolute bottom-4 sm:bottom-6 z-50",
          isRtl() ? "right-4" : "left-4"
        )}
      >
        <PrimaryButton
          text={t("login.dialog.button")}
          type="button"
          fullWidth={false}
          onClick={openDialog}
        />
      </div>
      <Dialog isOpen={isHelpOpen} {...helpData} />
    </>
  );
};

export default Login;
