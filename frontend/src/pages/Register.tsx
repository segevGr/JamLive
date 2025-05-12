import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import AuthFormLayout from "../components/AuthFormLayout";
import { API } from "../constants/api";
import { useAuthForm } from "../hooks/useAuthForm";
import { useState } from "react";
import { validateRegisterForm } from "../utils/validation";
import { usePageTitle } from "../hooks/usePageTitle";
import { ROUTES } from "../constants/routes";
interface Props {
  isAdmin?: boolean;
}

const instruments = [
  "Drums",
  "Guitar",
  "Bass",
  "Saxophone",
  "Keyboard",
  "Vocals",
];

export default function Register({ isAdmin = false }: Props) {
  usePageTitle("Register");
  const navigate = useNavigate();

  const { form, errors, setErrors, handleChange } = useAuthForm({
    userName: "",
    password: "",
    instrument: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

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
        instrument: form.instrument.toLowerCase(),
      };

      const res = isAdmin
        ? await axios.post(API.AUTH.SIGNUP_ADMIN, formToSend)
        : await axios.post(API.AUTH.SIGNUP, formToSend);

      setSuccessMessage("Registered successfully! Redirecting...");

      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 2000);
    } catch (err: any) {
      if (err.response?.data.message === "User already exists") {
        setErrors({
          userName: "Username already exists, please choose another username",
        });
      } else {
        console.log(err.response?.data);
        alert("Something went wrong\nPlease try again later");
      }
    }
  };

  return (
    <AuthFormLayout
      title="Register"
      imageSrc="/macabi-register.png"
      successMessage={successMessage ? "Welcome to Moveo Family!" : ""}
      isAdmin={isAdmin}
      formContent={
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Username"
            name="userName"
            placeholder="Select your username"
            value={form.userName}
            onChange={handleChange}
            errorMessage={errors.userName}
          />

          <InputField
            label="Your instrument"
            name="instrument"
            value={form.instrument}
            onChange={handleChange}
            as="select"
            listPlaceholder="Select your instrument"
            errorMessage={errors.instrument}
          >
            {instruments.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </InputField>

          <InputField
            label="Create password"
            name="password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            errorMessage={errors.password}
          />

          <button
            type="submit"
            className="bg-primaryLight hover:bg-primary transition text-textOnDark text-lg font-semibold px-4 py-3 rounded-xl w-full"
          >
            Register
          </button>
        </form>
      }
      bottomText={
        <>
          Already have an account?{" "}
          <span
            onClick={() => navigate(ROUTES.LOGIN)}
            className="text-primary font-semibold cursor-pointer"
          >
            Log In
          </span>
        </>
      }
    />
  );
}
