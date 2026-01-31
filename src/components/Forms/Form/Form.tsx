'use client';

import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';
import clsx from 'clsx';
import css from './Form.module.scss';

interface FormPropTypes<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  loading = false,
  className = '',
}: FormPropTypes<T>) => {
  const classes = clsx(css.Form, className && className, loading && css.Loading);
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={classes} noValidate>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
