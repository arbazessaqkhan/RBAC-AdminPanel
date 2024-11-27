export const getRoleName = (roles, roleId) => {
  const role = roles.find((r) => r.id === roleId);
  return role ? role.name : "Unknown";
};
