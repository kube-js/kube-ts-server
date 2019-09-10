import { v4 as uuid } from 'uuid';

const marketingCategory = {
  courses: [
    {
      slug: 'google-ads-introduction',
      title: 'Google Ads Introduction',
    },
    {
      slug: 'social-media-marketing',
      title: 'Social media marketing',
    },
    {
      slug: 'branding-techniques',
      title: 'Branding techniques',
    },
    {
      slug: 'introduction-to-copywriting',
      title: 'Introduction to copywriting',
    },
    {
      slug: 'email-marketing-for-beginners',
      title: 'Email marketing for beginners',
    },
    {
      slug: 'affiliate-marketing',
      title: 'Affiliate marketing',
    },
    {
      slug: 'branding-strategy',
      title: 'Branding strategy',
    },
    {
      slug: 'google-tag-manager-training',
      title: 'Google tag manager training',
    },
    {
      slug: 'web-content-writing',
      title: 'Web content writing',
    },
    {
      slug: 'seo-masterclass',
      title: 'SEO Master class',
    },
  ],
  id: uuid(),
  slug: 'marketing',
  title: 'Marketing',
};

export default marketingCategory;
