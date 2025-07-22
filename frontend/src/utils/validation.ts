import { instruments, Instrument } from "types";

function isEmpty(value: string): boolean {
  return !value.trim();
}

function isValidInstrument(value: string): value is Instrument {
  return instruments.includes(value as Instrument);
}

export function validateInstrument(
  instrument: string,
  prevInstrument?: string
) {
  const errors: { instrument?: string } = {};
  if (isEmpty(instrument)) {
    errors.instrument = "Please select an instrument";
  } else if (!isValidInstrument(instrument)) {
    errors.instrument = "Selected instrument is not valid";
  } else if (prevInstrument && prevInstrument === instrument) {
    errors.instrument =
      "The new instrument should be different from the current instrument";
  }
  return errors;
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

  Object.assign(errors, validateInstrument(form.instrument));

  if (isEmpty(form.password)) {
    errors.password = "Password is required";
  } else if (form.password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  return errors;
}

export function validatePasswordChange(form: {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}) {
  const errors: Partial<typeof form> = {};

  if (isEmpty(form.currentPassword)) {
    errors.currentPassword = "Current password is required";
  }

  if (isEmpty(form.newPassword)) {
    errors.newPassword = "New password is required";
  } else if (form.newPassword.length < 4) {
    errors.newPassword = "Password must be at least 4 characters";
  } else if (form.newPassword === form.currentPassword) {
    errors.newPassword = "New password must differ from current password";
  }

  if (isEmpty(form.confirmNewPassword)) {
    errors.confirmNewPassword = "Please confirm password";
  } else if (form.confirmNewPassword !== form.newPassword) {
    errors.confirmNewPassword = "Passwords don't match";
  }

  return errors;
}
