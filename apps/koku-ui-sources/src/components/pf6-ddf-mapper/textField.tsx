import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { FormGroup, TextInput } from '@patternfly/react-core';
import React from 'react';

const TextField: React.FC<any> = props => {
  const { input, meta, label, isRequired, helperText, description, isDisabled, placeholder } = useFieldApi(props);
  const isError = meta.touched && meta.error;
  const { type, ...inputRest } = input;
  const helpText = !isError ? helperText || description : undefined;

  return (
    <FormGroup label={label} isRequired={isRequired} fieldId={input.name}>
      {helpText && <div style={{ marginBottom: '8px', fontSize: 'var(--pf-global--FontSize--sm)' }}>{helpText}</div>}
      <TextInput
        id={input.name}
        {...inputRest}
        type={type === 'password' ? 'password' : 'text'}
        isDisabled={isDisabled}
        placeholder={placeholder}
        validated={isError ? 'error' : 'default'}
      />
      {isError && <div style={{ color: 'var(--pf-t--global--color--status--danger--default)' }}>{meta.error}</div>}
    </FormGroup>
  );
};

export default TextField;
