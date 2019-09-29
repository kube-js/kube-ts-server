import _pluck from 'ramda/src/pluck';
import Course from '../../../types/items/Course';
import Config from '../../FactoryConfig';

// tslint:disable-next-line:no-empty-interface
export interface Options {}

// tslint:disable-next-line:arrow-return-shorthand
export default ({ repo }: Config) => async (_options: Options) => {
  const { items: categories } = await repo.categories.getItems({
    pagination: {
      limit: 10000,
    },
  });

  const { items: courses } = await repo.courses.getItems({
    pagination: {
      limit: 10000,
    },
  });

  const { items: users } = await repo.users.getItems({
    pagination: {
      limit: 10000,
    },
  });

  const enhancedCourses = courses.map((course: Course) => ({
    ...course,
    user: users.filter(user => user.id === course.userId),
  }));

  return {
    bestSellers: {
      // TODO: in the future basing on number of enrolments choose the most popular one
      categories,
      courses: enhancedCourses,
    },
    mostViewed: {
      // TODO: in the future choose the most viewed ones
      courses: enhancedCourses,
    },
  };
};
