'use client';

import { useFormContext } from 'react-hook-form';
import { TextareaProps } from '@/types/inputs';
import { Label } from './../../../components';
import css from './InputTextarea.module.scss';

const InputTextarea: React.FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  rows = 4,
  cols,
  maxLength,
  resize = 'vertical',
  value,
  error: propsError,
  onChange,
  onInput,
  onBlur,
  onFocus,
}) => {
  let formContext;
  try {
    formContext = useFormContext();
  } catch {
    formContext = null;
  }

  const error = formContext ? formContext.formState.errors[name] : propsError;

  const registerProps = formContext ? formContext.register(name) : {};

  const textareaProps = {
    name,
    placeholder,
    rows,
    cols,
    maxLength,
    disabled,
    className: `${css.Textarea} ${error ? css.Invalid : ''} ${
      css[`Resize${resize.charAt(0).toUpperCase() + resize.slice(1)}`] || ''
    }`,
    ...registerProps,
    ...(onChange && { onChange }),
    ...(onInput && { onInput }),
    ...(onBlur && { onBlur }),
    ...(onFocus && { onFocus }),
    ...(!formContext &&
      value !== undefined && {
        value: value as string,
      }),
  };

  return (
    <Label label={label} required={required} error={typeof error === 'string' ? error : (error as any)?.message}>
      <textarea {...textareaProps} />
    </Label>
  );
};

export default InputTextarea;
