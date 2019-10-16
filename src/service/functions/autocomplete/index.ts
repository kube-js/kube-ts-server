import getVisibleUserProperties from '../../../utils/helpers/model/getVisibleUserProperties';
import Config from '../../FactoryConfig';

export interface Options {
  readonly query: string;
}

export default ({ repo }: Config) => async ({ query }: Options) => {
  const courses = await repo.courses.getItems({
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

  const users = await repo.users.getItems({
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

  return {
    courses,
    users: {
      cursor: users.cursor,
      items: users.items.map(getVisibleUserProperties),
    },
  };
};
