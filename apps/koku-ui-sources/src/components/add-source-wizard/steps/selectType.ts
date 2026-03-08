import { SOURCE_TYPES } from 'api/sourceTypes';

export const selectTypeStep = {
  name: 'select-type',
  title: 'Select source type',
  nextStep: 'source-name',
  fields: [
    {
      component: 'card-select',
      name: 'source_type',
      label: 'Select a source type',
      isRequired: true,
      options: SOURCE_TYPES.map(st => ({
        value: st.id,
        label: st.product_name,
        description: st.category,
      })),
      validate: [{ type: 'required' }],
    },
  ],
};
