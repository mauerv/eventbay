import React from 'react';

import { Callback } from 'types';
import { Form, Input, Submit } from './styles';

interface SimpleFormProps {
  value: string;
  submitText?: any; // TODO: Make this a more specific type.
  label?: string;
  onChange: Callback;
  onSubmit: Callback;
  placeholder?: any;
  buttonVariant?: 'text' | 'outlined' | 'contained' | undefined;
  disabled?: boolean;
  className?: any;
}

const SimpleForm = ({
  value,
  submitText,
  label,
  onChange,
  onSubmit,
  className,
  buttonVariant,
  disabled,
  placeholder,
}: SimpleFormProps) => {
  return (
    <Form onSubmit={onSubmit} data-test="simple-form" className={className}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        autoFocus
        data-test="input-field"
        fullWidth
      />
      <Submit type="submit" data-test="submit-button" variant={buttonVariant} disabled={disabled}>
        {submitText ? submitText : 'Send'}
      </Submit>
    </Form>
  );
};

export default SimpleForm;
