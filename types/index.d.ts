interface UserTypeSchema {
  _id?: string;
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


type TaskStatusTypeParams = {
  _id: string;
  title: string;
  svg: any;
  color: string;
}


type TaskTypeParams = {
  _id: string;
  name: string;
  description: string;
  icon: any;
  status: string;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
}

interface GoalTypeParams {
  name: string;
  _id: string;
  userId?: string;
  tasks: TaskTypeParams[];
  createdAt: string;
  updatedAt: string;
}