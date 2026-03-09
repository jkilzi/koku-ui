import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

export const sourceNameStep = {
  name: 'source-name',
  title: 'Source name',
  nextStep: ({ values }: any) => `credentials-${values.source_type}`,
  fields: [
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'source-name-description',
      label: 'Enter a name for your source.',
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'source_name',
      label: 'Name',
      placeholder: 'Enter a name for this source',
      isRequired: true,
      validate: [{ type: validatorTypes.REQUIRED }, { type: validatorTypes.MIN_LENGTH, threshold: 1 }],
    },
  ],
};
