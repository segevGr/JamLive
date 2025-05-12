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
    <AuthFormLayout
      title="Log in"
      imageSrc="/macabi-login.png"
      formContent={
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex justify-between items-center text-sm text-placeholderGray">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              Remember me
            </label>
            <span className="cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            className="bg-primaryLight hover:bg-primary transition text-textOnDark text-lg font-semibold px-4 py-3 rounded-xl w-full"
          >
            Log in
          </button>
        </form>
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
  );
}
