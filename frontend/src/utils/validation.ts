function isEmpty(value: string): boolean {
  return !value.trim();
}

export function validateLoginForm(form: {
  userName: string;
  password: string;
}) {
  const errors: Partial<typeof form> = {};

  if (isEmpty(form.userName)) errors.userName = "Username is required";
  if (isEmpty(form.password)) errors.password = "Password is required";

  return errors;
}

export function validateRegisterForm(form: {
  userName: string;
  password: string;
  instrument: string;
}) {
  const errors: Partial<typeof form> = {};

  if (isEmpty(form.userName)) {
    errors.userName = "Username is required";
  } else if (form.userName.length < 4) {
    errors.userName = "Username must be at least 4 characters";
  }

  if (isEmpty(form.instrument)) {
    errors.instrument = "Please select an instrument";
  }

  if (isEmpty(form.password)) {
    errors.password = "Password is required";
  } else if (form.password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  return errors;
}
