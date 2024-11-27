export const PERMISSION_TYPES = {
  READ: "read",
  WRITE: "write",
  UPDATE: "update",
  DELETE: "delete",
  ADMIN: "admin",
};

export const INITIAL_ROLES = [
  { id: 1, name: "Admin", permissions: Object.values(PERMISSION_TYPES) },
];
