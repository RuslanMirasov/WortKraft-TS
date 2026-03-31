'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { InputCheckboxProps } from '@/types/inputs';
import { Icon } from '../..';
import css from './InputCheckbox.module.scss';

const InputCheckbox: React.FC<InputCheckboxProps> = ({ name, children, error: propsError, disabled }) => {
  const formContext = useFormContext();
  const tErrors = useTranslations('errors');

  if (!formContext) {
    return null;
  }

  const fieldError = formContext.formState.errors[name];

  const errorKey =
    typeof fieldError?.message === 'string'
      ? fieldError.message
      : typeof propsError === 'string'
        ? propsError
        : undefined;

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
          </p>

          {errorKey && <p className={css.Error}>{tErrors(errorKey)}</p>}
        </label>
      )}
    />
  );
};

export default InputCheckbox;
