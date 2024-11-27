const roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "User", permissions: ["Read"] },
];

const users = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "User" },
];

export const getRoles = () => Promise.resolve(roles);

export const saveRole = (role) =>
  Promise.resolve(
    roles.findIndex((r) => r.id === role.id) === -1
      ? roles.push(role)
      : (roles[roles.findIndex((r) => r.id === role.id)] = role)
  );

export const deleteRole = (id) =>
  Promise.resolve(
    roles.splice(
      roles.findIndex((role) => role.id === id),
      1
    )
  );

// Add getUsers function
export const getUsers = () => Promise.resolve(users);
