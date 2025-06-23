import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/storeHooks";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";
import FormPageLayout from "../components/FormPageLayout";
import FormSection from "../components/FormSection";
import { API } from "../constants/api";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateLoginForm } from "../utils/validation";
import { usePageTitle } from "../hooks/usePageTitle";
import { ROUTES } from "../routes/routes";
import { axiosInstance } from "../constants/axios";

export default function Login() {
  usePageTitle("Login");
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
        res.data.user.role === "admin"
          ? ROUTES.ADMIN_SEARCH
          : ROUTES.WAITING_ROOM
      );
    } catch (err: any) {
      if (err.response?.data.message === "Incorrect userName or password") {
        setErrors({
          password: "Incorrect username or password, please try again",
        });
      } else {
        alert("Something went wrong\nPlease try again later");
      }
    }
  };

  return (
    <FormPageLayout
      title="Log In"
      subtitle="Welcome to JamLive"
      imageSrc="/login-img.png"
      bottomText="Don’t have an account?"
      bottomLinkText="Register"
      onBottomLinkClick={() => navigate(ROUTES.REGISTER)}
    >
      <FormSection
        buttonText="Log in"
        isDisabled={!isFormValid}
        onSubmit={handleSubmit}
      >
        <InputField
          label="Enter your Username*"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          errorMessage={errors.userName}
        />
        <InputField
          label="Enter your Password*"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />
      </FormSection>
    </FormPageLayout>
  );
}
