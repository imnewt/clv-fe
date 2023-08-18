import Base from "./Base";
import Role from "./Role";

export interface NewUser {
  userName: string;
  email: string;
  password: string;
  roleIds: string[];
}

export default interface User extends NewUser, Base {
  id: string;
  isActive: boolean;
  roles: Role[];
}
