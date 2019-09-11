import { v4 as uuid } from 'uuid';

const businessCategory = {
  courses: [
    {
      slug: 'introduction-to-project-management',
      title: 'Intruduction to project management',
    },
    {
      slug: 'complete-guide-to-forex',
      title: 'Complete guide to forex',
    },
    {
      slug: 'business-analysis-fundamentals',
      title: 'Business analysis fundamentals',
    },
    {
      slug: 'advanced-sales-techniques',
      title: 'Advanced sales techniques',
    },
    {
      slug: 'from-employee-to-entrepreneur',
      title: 'From employee to entrepreneur',
    },
    {
      slug: 'running-e-commerce-website',
      title: 'Running e-commerce website',
    },
    {
      slug: 'business-development-for-beginners',
      title: 'Business development for beginners',
    },
    {
      slug: 'introduction-to-freelancing',
      title: 'Introduction to freelancing',
    },
    {
      slug: 'run-business-remotely',
      title: 'Run business remotely',
    },
    {
      slug: 'real-estate-investing',
      title: 'Real estate investing',
    },
  ],
  id: uuid(),
  slug: 'business',
  title: 'Business',
};

export default businessCategory;
