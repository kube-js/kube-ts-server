import { v4 as uuid } from 'uuid';

const softwareDevelopmentCategory = {
  courses: [
    {
      slug: 'introduction-to-sql',
      title: 'Intruduction to sql',
    },
    {
      slug: 'artificial-intelligence',
      title: 'Artificial intelligence',
    },
    {
      slug: 'data-science-and-machine-learning',
      title: 'Data Science and Machine Learning',
    },
    {
      slug: 'docker-fundamentals',
      title: 'Docker fundamentals',
    },
    {
      slug: 'building-node-js-restful-api',
      title: 'Building node.js RESTful api',
    },
    {
      slug: 'learn-python-from-scratch',
      title: 'Learn python from scratch',
    },
    {
      slug: 'designing-microservices-architecture',
      title: 'Designing microservices architecture',
    },
    {
      slug: 'complete-kubernetes-masterclass',
      title: 'Complete kubernetes masterclass',
    },
    {
      slug: 'building-single-page-app-with-react-js',
      title: 'Building Single Page Application with react.js',
    },
    {
      slug: 'advanced-graphql-course',
      title: 'Advanced graphql course',
    },
  ],
  id: uuid(),
  slug: 'software-development',
  title: 'Software development',
};

export default softwareDevelopmentCategory;
