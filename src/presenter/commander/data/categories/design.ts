import { v4 as uuid } from 'uuid';

const designCategory = {
  courses: [
    {
      slug: 'drawing-course-for-beginners',
      title: 'Drawing course for beginners',
    },
    {
      slug: 'learn-3d-animations',
      title: 'Learn 3D animations',
    },
    {
      slug: 'advanced-photoshop-training',
      title: 'Advanced photoshop training',
    },
    {
      slug: 'ux-for-beginners',
      title: 'User experience for beginners',
    },
    {
      slug: 'drawing-comics',
      title: 'Drawing comics',
    },
    {
      slug: 'animations-masterclass',
      title: 'Animations masterclass',
    },
    {
      slug: 'adobe-illustrator-for-beginners',
      title: 'Adobe Illustrator for beginners',
    },
    {
      slug: 'web-design-basics',
      title: 'Web design basics',
    },
    {
      slug: 'sketch-fundamentals',
      title: 'Sketch fundamentals',
    },
    {
      slug: 'mobile-app-design',
      title: 'Mobile App design',
    },
  ],
  id: uuid(),
  slug: 'design',
  title: 'Design',
};

export default designCategory;
