import { v4 as uuid } from 'uuid';

const healthAndFitnessCategory = {
  courses: [
    {
      slug: 'introduction-to-aromatheraphy',
      title: 'Intruduction to aromatheraphy',
    },
    {
      slug: 'yoga-masterclass',
      title: 'Yoga masterclass',
    },
    {
      slug: 'comprahensive-nutrition-guide',
      title: 'Comprahensive nutrition guide',
    },
    {
      slug: 'introduction-to-cognitive-behavioral-theraphy',
      title: 'Introduction to cognitive behavioral therapy',
    },
    {
      slug: 'meditation-and-visualisation',
      title: 'Mediation and visualisation',
    },
    {
      slug: 'hypnotheraphy-fundamentals',
      title: 'Hypnotheraphy fundamentals',
    },
    {
      slug: 'herbalism-for-beginners',
      title: 'Herbalism-for-beginners',
    },
    {
      slug: 'stress-management-at-workplace',
      title: 'Stress management at workplace',
    },
    {
      slug: 'pilates-course',
      title: 'Pilates course',
    },
    {
      slug: 'neuroplasticity',
      title: 'Neuroplasticity',
    },
  ],
  id: uuid(),
  slug: 'health-and-fitness',
  title: 'Health and Fitness',
};

export default healthAndFitnessCategory;
