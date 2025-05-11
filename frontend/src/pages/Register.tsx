import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../store/storeHooks";
import { login } from "../store/authSlice";
import InputField from "../components/InputField";

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
    username: "",
    password: "",
    instrument: "",
  });

  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors: Partial<typeof form> = {};

    if (!form.username.trim()) newErrors.username = "username is required";
    else if (form.username.length < 4)
      newErrors.username = "username must be at least 4 characters";
    if (!form.instrument.trim())
      newErrors.instrument = "Please select an instrument";
    if (!form.password.trim()) newErrors.password = "password is required";
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
      const res = await axios.post("http://localhost:3000/users/signup", form);
      // dispatch(login(res.data));
      // navigate(res.data.role === "admin" ? "/admin" : "/player");
      console.log(res.data);
    } catch (err: any) {
      setErrors({ username: err.response?.data?.message || "Signup failed" });
    }
  };

  return (
    <div className="flex h-screen font-sans bg-background">
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl text-gold mb-2">Welcome to JaMoveo</h1>
        <h2 className="text-7xl font-bold text-primary mb-10">Register</h2>

        <form className="space-y-6 w-full max-w-sm" onSubmit={handleSubmit}>
          <InputField
            label="Username"
            name="username"
            placeholder="Select your username"
            value={form.username}
            onChange={handleChange}
            errorMessage={errors.username}
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
            placeholder="Your Password"
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

        <p className="text-sm mt-4 text-placeholderGray">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary font-semibold cursor-pointer"
          >
            Log In
          </span>
        </p>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src="/macabi.png"
          alt="musicians"
          className="rounded-3xl shadow-xl object-cover w-full h-full max-w-[90%] max-h-[95%]"
        />
      </div>
    </div>
  );
}
