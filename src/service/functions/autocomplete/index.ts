import { INSTRUCTOR } from '../../../constants/roles';
import getVisibleUserProperties from '../../../utils/helpers/model/getVisibleUserProperties';
import Config from '../../FactoryConfig';

export interface Options {
  readonly query: string;
}

export default ({ repo }: Config) => async ({ query }: Options) => {
  const { items: courses } = await repo.courses.getItems({
    filter: {
      $or: [
        {
          title: { $search: query },
        },
        {
          description: { $search: query },
        },
        {
          goals: { $search: query },
        },
        {
          requirements: { $search: query },
        },
      ],
    },
  });

  const { items: users } = await repo.users.getItems({
    filter: {
      $or: [
        {
          email: { $search: query },
        },
        {
          firstName: { $search: query },
        },
        {
          lastName: { $search: query },
        },
      ],
    },
  });

  const { items: roles } = await repo.roles.getItems({
    filter: {
      name: INSTRUCTOR,
    },
  });

  const instructorRoleId = roles[0].id;

  const { items: usersRoles } = await repo.userRole.getItems({
    filter: {
      roleId: instructorRoleId,
    },
  });

  const instructorsIds = usersRoles.map(userRole => userRole.userId);

  const filteredUsers = users.filter(user => instructorsIds.includes(user.id));

  return {
    courses,
    users: filteredUsers.map(getVisibleUserProperties),
  };
};
