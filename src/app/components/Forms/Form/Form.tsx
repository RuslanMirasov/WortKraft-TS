import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import css from "./Form.module.scss";

interface FormPropTypes<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = "",
}: FormPropTypes<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${css.Form} ${className}`}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
