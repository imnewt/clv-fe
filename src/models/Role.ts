import Permission from "./Permission";

export interface NewRole {
  name: string;
  permissionIds: string[];
}

export default interface Role extends NewRole {
  id: string;
  permissions: Permission[];
}
