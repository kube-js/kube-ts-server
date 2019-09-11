import { v4 as uuid } from 'uuid';

const financeCategory = {
  courses: [
    {
      slug: 'invest-in-stocks',
      title: 'Invest in stocks',
    },
    {
      slug: 'introduction-to-blockchain',
      title: 'Introduction to blockchain',
    },
    {
      slug: 'options-trading-fundamentals',
      title: 'Options trading fundamentals',
    },
    {
      slug: 'introduction-to-investing',
      title: 'Introduction-to-investing',
    },
    {
      slug: 'tax-optimisation',
      title: 'Tax optimisation',
    },
    {
      slug: 'introduction-to-balance-sheet',
      title: 'Introduction to balance sheet',
    },
    {
      slug: 'budgeting-basics',
      title: 'Budgeting basics',
    },
    {
      slug: 'healthy cash flow',
      title: 'Healthy cash flow',
    },
    {
      slug: 'learn-how-to-create-property-portfolio',
      title: 'Learn how to create property portfolio',
    },
    {
      slug: 'hedge-and-mutual-funds',
      title: 'Hedge and mutual funds',
    },
  ],
  id: uuid(),
  slug: 'finance',
  title: 'Finance',
};

export default financeCategory;
