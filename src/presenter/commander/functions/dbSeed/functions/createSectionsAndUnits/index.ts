// tslint:disable:no-magic-numbers
// tslint:disable:no-console
import _pluck from 'ramda/src/pluck';
import { v4 as uuid } from 'uuid';
import getUtcDate from '../../../../../../utils/helpers/date/getUtcDate';
import FactoryConfig from '../../../../presenterFactory/FactoryConfig';

export interface SectionPartial {
  readonly title: string;
  readonly id: string;
  readonly order: number;
}

export interface Options {
  readonly coursesIds: string[];
  readonly sections: SectionPartial[];
}

const createSectionsAndUnits = (config: FactoryConfig) => async ({
  coursesIds,
  sections,
}: Options) => {
  console.log(`--------------------------------------------------------`);
  console.log(
    `Creating sections `
  );
  const sectionsPromises = coursesIds.reduce((acc: Promise<any>[], courseId) => {
    const sectionsPromisesArray = sections.map(async section => {
      const sectionId = uuid();

      return config.service.sections.createItem({
        id: sectionId,
        item: {
          courseId,
          createdAt: getUtcDate(),
          id: sectionId,
          order: section.order,
          title: section.title,
        },
      });
    });

    return [...acc, ...sectionsPromisesArray];
  }, []);

  await Promise.all(sectionsPromises);

  
  console.log(`Sections created successfuly!`);
  console.log(`--------------------------------------------------------`);
};

export default createSectionsAndUnits;
