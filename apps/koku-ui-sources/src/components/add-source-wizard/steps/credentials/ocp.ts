import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';

export const ocpCredentialsStep = {
  name: 'credentials-OCP',
  title: 'OpenShift credentials',
  nextStep: 'review',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'credentials.cluster_id',
      label: 'Cluster identifier',
      helperText: 'Enter the cluster ID from the Cost Management Metrics Operator status.',
      isRequired: true,
      validate: [{ type: validatorTypes.REQUIRED }],
    },
  ],
};
