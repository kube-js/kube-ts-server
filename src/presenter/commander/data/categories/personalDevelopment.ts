import { v4 as uuid } from 'uuid';

const personalDevelopmentCategory = {
  courses: [
    {
      slug: 'life-coach-training',
      title: 'Life coach training',
    },
    {
      slug: 'master-your-cv',
      title: 'Master your CV',
    },
    {
      slug: 'speed-reading',
      title: 'Speed reading',
    },
    {
      slug: 'nlp-practitioner',
      title: 'NLP practitioner',
    },
    {
      slug: 'public-speaking',
      title: 'Public speaking',
    },
    {
      slug: 'negotiation-techniques',
      title: 'Negotiation-techniques',
    },
    {
      slug: 'time-management',
      title: 'Time management',
    },
    {
      slug: 'body-language',
      title: 'Body language',
    },
    {
      slug: 'micro-expressions-training',
      title: 'Micro expressions training',
    },
    {
      slug: 'learn-memory-techniques',
      title: 'Learn memory techniques',
    },
  ],
  id: uuid(),
  slug: 'personal-development',
  title: 'Personal development',
};

export default personalDevelopmentCategory;
