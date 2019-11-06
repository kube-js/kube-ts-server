import { Filter, ItemNotFoundError } from '@js-items/foundation';
import _pluck from 'ramda/src/pluck';
import Course from '../../../types/items/Course';
import getVisibleUserProperties from '../../../utils/helpers/model/getVisibleUserProperties';
import Config from '../../FactoryConfig';

export interface Options {
  readonly filter: Filter<Course>;
}

export default ({ repo }: Config) => async ({ filter }: Options) => {
  const { items: courses } = await repo.courses.getItems({
    filter,
  });

  if (courses.length === 0) {
    throw new ItemNotFoundError('Course');
  }

  const course = courses[0];

  const { item: category } = await repo.categories.getItem({
    id: course.categoryId,
  });

  const { item: user } = await repo.users.getItem({
    id: course.userId,
  });

  const { items: sections } = await repo.sections.getItems({
    filter: {
      courseId: course.id
    },
  });

  return {
    course: {
      ...course,
      category,
      sections,
      user: getVisibleUserProperties(user),
    },
  };
};
