interface UserTypeSchema {
  username: string | FormDataEntryValue;
  password: string | FormDataEntryValue;
  confirmPassword?: string | FormDataEntryValue | null;
  firstName?: string | FormDataEntryValue | null;
  lastName?: string | FormDataEntryValue | null;
  email?: string | FormDataEntryValue | null;
  bio?: string | FormDataEntryValue | null;
}

interface AlertTypeSchema {
  message: string,
  type: "info" | "error" | "success",
}