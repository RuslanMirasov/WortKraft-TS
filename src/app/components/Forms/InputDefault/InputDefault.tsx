import { useFormContext } from "react-hook-form";
import { TextInputProps } from "@/types/inputs";
import { Label } from "./../../../components";
import css from "./InputDefault.module.scss";

const InputDefault: React.FC<TextInputProps> = ({
  name,
  type,
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

  const error = formContext ? formContext.formState.errors[name] : propsError;

  const registerProps = formContext ? formContext.register(name) : {};

  const inputProps = {
    name,
    type,
    placeholder,
    min,
    max,
    disabled,
    className: `${css.Input} ${error ? css.Invalid : ""}`,
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
      error={typeof error === "string" ? error : (error as any)?.message}
      icon={icon}
    >
      <input {...inputProps} />
    </Label>
  );
};

export default InputDefault;
