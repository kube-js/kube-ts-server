import { v4 as uuid } from 'uuid';

const photographyCategory = {
  courses: [
    {
      slug: 'introduction-to-photography',
      title: 'Intruduction to photography',
    },
    {
      slug: 'wedding-photography',
      title: 'Wedding photography',
    },
    {
      slug: 'food-photography',
      title: 'Food photography',
    },
    {
      slug: 'black-and-white-photography',
      title: 'Black and white photography',
    },
    {
      slug: 'how-to-hire-great-employees',
      title: 'How to hire great employees',
    },
    {
      slug: 'learn-imovie',
      title: 'Learn imovie',
    },
    {
      slug: 'action-photography',
      title: 'Action photography',
    },
    {
      slug: 'mastering-photoshop',
      title: 'Mastering photoshop',
    },
    {
      slug: 'adobe-lightroom-cc',
      title: 'Adobe lightroom CC+',
    },
  ],
  id: uuid(),
  slug: 'photography',
  title: 'Photography',
};

export default photographyCategory;
