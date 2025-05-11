import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../store/storeHooks";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";
import AuthFormLayout from "../components/AuthFormLayout";
import { API } from "../constants/api";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof typeof form];
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors: Partial<typeof form> = {};

    if (!form.userName.trim()) newErrors.userName = "Username is required";
    if (!form.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    try {
      const res = await axios.post(API.AUTH.LOGIN, form);
      dispatch(login(res.data));
      navigate(res.data.role === "admin" ? "/admin" : "/player");
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
            onClick={() => navigate("/register")}
            className="text-primary font-semibold cursor-pointer"
          >
            Register
          </span>
        </>
      }
    />
  );
}
