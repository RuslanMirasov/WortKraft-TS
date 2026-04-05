'use client';

import { useFormContext } from 'react-hook-form';
import { TextInputProps } from '@/types/inputs';
import { Icon, Label } from '../..';
import css from './InputPassword.module.scss';
import { useState } from 'react';

const InputPassword: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  required,
  disabled,
  min,
  max,
  icon,
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

  const [inputType, setInputType] = useState('password');
  const error = formContext ? formContext.formState.errors[name] : propsError;
  const registerProps = formContext ? formContext.register(name) : {};

  const inputProps = {
    name,
    placeholder,
    min,
    max,
    disabled,
    className: `${css.Input} ${error ? css.Invalid : ''}`,
    ...registerProps,
    ...(onChange && { onChange }),
    ...(onInput && { onInput }),
    ...(onBlur && { onBlur }),
    ...(onFocus && { onFocus }),
    ...(!formContext &&
      value !== undefined && {
        value: value as string | number,
      }),
  };

  return (
    <Label
      label={label}
      required={required}
      error={typeof error === 'string' ? error : (error as any)?.message}
      icon={icon}
    >
      <input type={inputType} {...inputProps} />
      <button
        type="button"
        className={css.Button}
        onClick={() => setInputType(prev => (prev === 'password' ? 'text' : 'password'))}
      >
        <Icon name={inputType === 'password' ? 'password-hide' : 'password-show'} size="20" />
      </button>
    </Label>
  );
};

export default InputPassword;
