import Base from "./Base";
import Role from "./Role";

export interface NewUser {
  userName: string;
  email: string;
  password: string;
  roleIds: string[];
}

export default interface User extends Base {
  id: string;
  userName: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  roles: Role[];
  roleIds?: string[];
}
