// tslint:disable:no-magic-numbers
// tslint:disable:no-console
import faker from 'faker';
import _pluck from 'ramda/src/pluck';
import { v4 as uuid } from 'uuid';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';
import convertToHtml from '../../../../utils/convertToHtml';

export interface CoursePartial {
  readonly title: string;
  readonly slug: string;
}

export interface CategoriesPartial {
  readonly slug: string;
  readonly title: string;
  readonly id: string;
  readonly courses: CoursePartial[];
}

export interface Options {
  readonly categories: CategoriesPartial[];
  readonly instructorsIds: string[];
}

const createCategoriesAndCourses = (config: FactoryConfig) => async ({
  categories,
  instructorsIds,
}: Options) => {
  console.log(`--------------------------------------------------------`);
  console.log(
    `Creating categories [${categories.map(({ title }) => title).join(', ')}]`
  );

  const categoriesPromises = categories.map(async ({ courses, ...category }) =>
    config.service.categories.createItem({
      id: category.id,
      item: {
        ...category,
        createdAt: getUtcDate(),
        id: category.id,
      },
    })
  );

  await Promise.all(categoriesPromises);

  console.log(`Categories created successfuly!`);
  console.log(`--------------------------------------------------------`);

  const coursesPromises = categories.reduce((acc: Promise<any>[], category) => {
    const coursesPromisesArray = category.courses.map(async course => {
      const courseId = uuid();

      // randomly assign instructorId
      const index = Math.floor(Math.random() * instructorsIds.length);

      return config.service.courses.createItem({
        id: courseId,
        item: {
          ...course,
          categoryId: category.id,
          createdAt: getUtcDate(),
          description: convertToHtml({ text: faker.lorem.paragraphs(10) }),
          goals: convertToHtml({
            elementTag: 'li',
            parentElement: 'ul',
            text: faker.lorem.paragraphs(8),
          }),
          id: courseId,
          imageUrl: faker.image.imageUrl(480, 300),
          isApproved: true,
          isPaid: true,
          isPublished: true,
          requirements: convertToHtml({
            elementTag: 'li',
            parentElement: 'ul',
            text: faker.lorem.paragraphs(8),
          }),
          userId: instructorsIds[index],
        },
      });
    });

    return [...acc, ...coursesPromisesArray];
  }, []);

  await Promise.all(coursesPromises);

  console.log(`Courses created successfuly!`);
  console.log(`--------------------------------------------------------`);
};

export default createCategoriesAndCourses;
