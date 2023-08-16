import Base from "./Base";
import Role from "./Role";

export default interface User extends Base {
  id: string;
  userName: string;
  email: string;
  isActive: boolean;
  isDeleted: boolean;
  roles: Role[];
}
