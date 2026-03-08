import useFieldApi from '@data-driven-forms/react-form-renderer/use-field-api';
import { FormGroup, TextArea as PFTextArea } from '@patternfly/react-core';
import React from 'react';

const TextArea: React.FC<any> = props => {
  const { input, meta, label, isRequired, isDisabled, placeholder } = useFieldApi(props);
  const isError = meta.touched && meta.error;

  return (
    <FormGroup label={label} isRequired={isRequired} fieldId={input.name}>
      <PFTextArea
        id={input.name}
        {...input}
        isDisabled={isDisabled}
        placeholder={placeholder}
        validated={isError ? 'error' : 'default'}
      />
      {isError && <div style={{ color: 'var(--pf-t--global--color--status--danger--default)' }}>{meta.error}</div>}
    </FormGroup>
  );
};

export default TextArea;
