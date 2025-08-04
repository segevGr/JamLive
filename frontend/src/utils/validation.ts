import { instruments, Instrument } from "types";
import { TFunction } from "i18next";

const validation = (t: TFunction) => {
  function isEmpty(value: string): boolean {
    return !value.trim();
  }

  function requireField(
    fieldValue: string,
    fieldName: string,
    errorLabel: string,
    errors: Record<string, string>
  ) {
    if (isEmpty(fieldValue)) {
      errors[fieldName] = t("errors.formErrors.required", {
        field: errorLabel,
      });
    }
  }

  function requireMinLength(
    value: string,
    min: number,
    fieldName: string,
    label: string,
    errors: Record<string, string>
  ) {
    if (value.length < min && !errors[fieldName]) {
      errors[fieldName] = t("errors.formErrors.minLength", {
        field: label,
        min,
      });
    }
  }

  function requireMaxLength(
    value: string,
    max: number,
    fieldName: string,
    label: string,
    errors: Record<string, string>
  ) {
    if (value.length > max && !errors[fieldName]) {
      errors[fieldName] = t("errors.formErrors.maxLength", {
        field: label,
        max,
      });
    }
  }

  function isValidInstrument(value: string): value is Instrument {
    return instruments.includes(value as Instrument);
  }

  function isEqual(newValue: string, oldValue: string): boolean {
    return newValue === oldValue;
  }

  function validateInstrument(instrument: string, prevInstrument?: string) {
    const errors: { instrument?: string } = {};
    if (isEmpty(instrument)) {
      errors.instrument = "Please select an instrument";
    } else if (!isValidInstrument(instrument)) {
      errors.instrument = "Selected instrument is not valid";
    } else if (
      prevInstrument &&
      isEqual(instrument, prevInstrument as Instrument)
    ) {
      errors.instrument =
        "The new instrument should be different from the current instrument";
    }
    return errors;
  }

  function validateLoginForm(form: { userName: string; password: string }) {
    const errors: Partial<typeof form> = {};

    requireField(form.userName, "userName", "Username", errors);
    requireField(form.password, "password", "Password", errors);

    return errors;
  }

  function validateRegisterForm(form: {
    userName: string;
    password: string;
    instrument: string;
  }) {
    const errors: Partial<typeof form> = {};

    const { userName, password, instrument } = form;
    requireField(userName, "userName", "Username", errors);
    requireMinLength(userName, 4, "userName", "Username", errors);
    requireMaxLength(userName, 20, "userName", "Username", errors);

    Object.assign(errors, validateInstrument(instrument));

    requireField(password, "password", "Password", errors);
    requireMinLength(password, 4, "password", "Password", errors);
    requireMaxLength(password, 20, "password", "Password", errors);

    return errors;
  }

  function validatePasswordChange(form: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) {
    const errors: Partial<typeof form> = {};
    const { newPassword, confirmNewPassword, currentPassword } = form;

    requireField(
      form.currentPassword,
      "currentPassword",
      "Current password",
      errors
    );

    requireField(newPassword, "newPassword", "New password", errors);
    requireMinLength(newPassword, 4, "newPassword", "New password", errors);
    requireMaxLength(newPassword, 20, "newPassword", "New password", errors);
    if (isEqual(newPassword, currentPassword)) {
      errors.newPassword = "New password must differ from current password";
    }

    requireField(
      confirmNewPassword,
      "confirmNewPassword",
      "Confirm password",
      errors
    );

    if (!isEqual(confirmNewPassword, newPassword)) {
      errors.confirmNewPassword = "Passwords don't match";
    }
    return errors;
  }

  return {
    validateLoginForm,
    validateRegisterForm,
    validatePasswordChange,
    validateInstrument,
  };
};

export default validation;
