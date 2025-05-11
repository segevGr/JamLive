import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../store/storeHooks";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";
import AuthFormLayout from "../components/AuthFormLayout";
import { API } from "../constants/api";

const instruments = [
  "Drums",
  "Guitar",
  "Bass",
  "Saxophone",
  "Keyboard",
  "Vocals",
];

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
    instrument: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [successMessage, setSuccessMessage] = useState("");

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
    else if (form.userName.length < 4)
      newErrors.userName = "Username must be at least 4 characters";

    if (!form.instrument.trim())
      newErrors.instrument = "Please select an instrument";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 4)
      newErrors.password = "Password must be at least 4 characters";

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

      const res = await axios.post(API.AUTH.SIGNUP, formToSend);

      setSuccessMessage("Registered successfully! Redirecting...");

      setTimeout(() => {
        // dispatch(login(res.data));
        navigate("/login");
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
            onClick={() => navigate("/login")}
            className="text-primary font-semibold cursor-pointer"
          >
            Log In
          </span>
        </>
      }
    />
  );
}
