import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/storeHooks";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";
import AuthFormLayout from "../components/AuthFormLayout";
import { API } from "../constants/api";
import { useAuthForm } from "../hooks/useAuthForm";
import { validateLoginForm } from "../utils/validation";
import { usePageTitle } from "../hooks/usePageTitle";
import { ROUTES } from "../constants/routes";
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

    try {
      const res = await axiosInstance.post(API.AUTH.LOGIN, form);
      dispatch(
        login({
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
        console.log(err.response?.data);
        alert("Something went wrong\nPlease try again later");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <AuthFormLayout
        title="Log in"
        imageSrc="/macabi-login.png"
        formContent={
          <>
            <InputField
              label="Enter your Username"
              name="userName"
              placeholder="Username"
              value={form.userName}
              onChange={handleChange}
              errorMessage={errors.userName}
            />
            <InputField
              label="Enter your Password"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              errorMessage={errors.password}
            />
          </>
        }
        submitButton={
          <button
            type="submit"
            className={`text-lg font-semibold px-4 py-3 rounded-xl w-full transition ${
              isFormValid
                ? "bg-primaryLight hover:bg-primary text-textOnDark opacity-100 cursor-pointer"
                : "bg-gray-400 text-white opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Log in
          </button>
        }
        bottomText={
          <>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate(ROUTES.REGISTER)}
              className="text-primary font-semibold cursor-pointer"
            >
              Register
            </span>
          </>
        }
      />
    </form>
  );
}
