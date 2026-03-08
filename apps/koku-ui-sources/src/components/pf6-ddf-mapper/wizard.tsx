import Wizard from '@data-driven-forms/common/wizard';
import WizardContext from '@data-driven-forms/react-form-renderer/wizard-context';
import { Button, ButtonVariant } from '@patternfly/react-core';
import React, { useContext } from 'react';

const PF6WizardRenderer: React.FC<any> = () => {
  const {
    formOptions,
    currentStep,
    handlePrev,
    handleNext,
    navSchema,
    activeStepIndex,
    selectNext,
    conditionalSubmitFlag,
  } = useContext(WizardContext as React.Context<any>);

  if (!currentStep) {
    return null;
  }

  const isLastStep = activeStepIndex >= navSchema.length - 1;
  const nextStepName = currentStep.nextStep
    ? selectNext?.(currentStep.nextStep, formOptions.getState)
    : undefined;
  const isSubmitStep = nextStepName === conditionalSubmitFlag;
  const isNextDisabled = !formOptions.valid;

  const onNext = () => {
    if (isLastStep || isSubmitStep) {
      formOptions.handleSubmit?.();
    } else {
      handleNext(nextStepName);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2>{currentStep.title || currentStep.name}</h2>
      </div>
      <div style={{ marginBottom: '24px' }}>{currentStep.fields && formOptions.renderForm(currentStep.fields)}</div>
      <footer style={{ display: 'flex', gap: '16px', justifyContent: 'flex-end', paddingTop: '16px' }}>
        <Button variant={ButtonVariant.secondary} onClick={handlePrev} isDisabled={activeStepIndex === 0}>
          Back
        </Button>
        <Button variant={ButtonVariant.primary} onClick={onNext} isDisabled={isNextDisabled}>
          {isLastStep || isSubmitStep ? 'Submit' : 'Next'}
        </Button>
        <Button variant={ButtonVariant.link} onClick={formOptions.onCancel}>
          Cancel
        </Button>
      </footer>
    </div>
  );
};

const WizardMapper: React.FC<any> = props => {
  return <Wizard Wizard={PF6WizardRenderer} {...props} />;
};

export default WizardMapper;
