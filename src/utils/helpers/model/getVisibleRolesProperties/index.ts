import Role from '../../../../types/items/Role';

export default (roles: Role[] = []): string[] =>
  roles.map(role => role.name);
