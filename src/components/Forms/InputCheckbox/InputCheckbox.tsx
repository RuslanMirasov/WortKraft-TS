'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { InputCheckboxProps } from '@/types/inputs';
import { Icon } from '../..';
import css from './InputCheckbox.module.scss';

const InputCheckbox: React.FC<InputCheckboxProps> = ({ name, children, error: propsError, disabled, required }) => {
  const formContext = useFormContext();
  const error = formContext?.formState.errors[name] || propsError;

  if (!formContext) {
    return null;
  }

  return (
    <Controller
      name={name}
      control={formContext.control}
      render={({ field }) => (
        <label className={`${css.Checkbox} ${disabled ? css.Disabled : ''}`}>
          <input
            type="checkbox"
            checked={!!field.value}
            disabled={disabled}
            onChange={e => field.onChange(e.target.checked)}
          />

          <p className={css.Label}>
            <Icon name="checkbox" fill="var(--white)" stroke="2" />
            {children}
            {required && <span className={css.RequiredMark}>*</span>}
          </p>

          {error && <p className={css.Error}>{typeof error === 'string' ? error : (error as any)?.message}</p>}
        </label>
      )}
    />
  );
};

export default InputCheckbox;
