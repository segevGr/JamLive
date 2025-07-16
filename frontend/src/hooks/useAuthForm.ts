import { useState } from "react";

export default function useAuthForm<T extends Record<string, string>>(
  initialState: T
) {
  const [form, setForm] = useState<T>(initialState);
  const [errors, setErrors] = useState<Partial<T>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof T];
      return newErrors;
    });
  };

  return {
    form,
    errors,
    setErrors,
    handleChange,
  };
}
