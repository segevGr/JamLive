import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import FormPageLayout from "../components/FormPageLayout";
import FormSection from "../components/FormSection";
import { API } from "../constants/api";
import { useAuthForm } from "../hooks/useAuthForm";
import { useState } from "react";
import { validateRegisterForm } from "../utils/validation";
import { usePageTitle } from "../hooks/usePageTitle";
import { ROUTES } from "../routes/routes";
import { axiosInstance } from "../constants/axios";
import ModalDialog from "../components/ModalDialog";

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
        instrument: form.instrument.toLowerCase(),
        userName: form.userName.toLowerCase(),
      };

      isAdmin
        ? await axiosInstance.post(API.AUTH.SIGNUP_ADMIN, formToSend)
        : await axiosInstance.post(API.AUTH.SIGNUP, formToSend);

      setShowSuccessModal(true);
    } catch (err: any) {
      if (err.response?.data.message === "User already exists") {
        setErrors({
          userName: "Username already exists, please choose another username",
        });
      } else {
        alert("Something went wrong\nPlease try again later");
      }
    }
  };

  return (
    <>
      <FormPageLayout
        title="Register"
        subtitle="Welcome to JamLive"
        imageSrc="/register-img.png"
        isAdmin={isAdmin}
        bottomText="Already have an account?"
        bottomLinkText="Log In"
        onBottomLinkClick={() => navigate(ROUTES.LOGIN)}
      >
        <FormSection
          buttonText="Register"
          isDisabled={!isFormValid}
          onSubmit={handleSubmit}
        >
          <InputField
            label="Username*"
            name="userName"
            placeholder="Select your username"
            value={form.userName}
            onChange={handleChange}
            errorMessage={errors.userName}
          />
          <InputField
            label="Your instrument*"
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
            label="Create password*"
            name="password"
            type="password"
            placeholder="Your password"
            value={form.password}
            onChange={handleChange}
            errorMessage={errors.password}
          />
        </FormSection>
      </FormPageLayout>

      <ModalDialog
        isOpen={showSuccessModal}
        title="Registered Successfully!"
        message="Welcome to the JamLive Family. You can now log in."
        confirmText="Go to Login"
        onConfirm={() => navigate(ROUTES.LOGIN)}
        confirmColor="green"
        showButtons={true}
      />
    </>
  );
}
