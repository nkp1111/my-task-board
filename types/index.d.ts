interface UserTypeSchema {
  username: string | FormDataEntryValue;
  firstName?: string | FormDataEntryValue | null;
  lastName?: string | FormDataEntryValue | null;
  email?: string | FormDataEntryValue | null;
  bio?: string | FormDataEntryValue | null;
  avatar?: string | FormDataEntryValue | null;
  status?: string | FormDataEntryValue | null;
}

interface UserTypeWithPasswordSchema extends UserTypeSchema {
  password: string | FormDataEntryValue;
  confirmPassword?: string | FormDataEntryValue | null;
}


interface SVGTypeParams {
  width?: number;
  height?: number;
  className?: string;
}