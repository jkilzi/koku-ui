import componentTypes from '@data-driven-forms/react-form-renderer/component-types';

export const reviewStep = {
  name: 'review',
  title: 'Review',
  fields: [
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'review-description',
      label: 'Review the information below and click Submit to create the source.',
    },
  ],
};
