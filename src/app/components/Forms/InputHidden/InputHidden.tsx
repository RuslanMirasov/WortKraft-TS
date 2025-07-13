import { useFormContext } from "react-hook-form";
import { InputHiddenProps } from "@/types/inputs";

const InputHidden: React.FC<InputHiddenProps> = ({ name, value, onChange }) => {
  let formContext;
  try {
    formContext = useFormContext();
  } catch {
    formContext = null;
  }

  const registerProps = formContext ? formContext.register(name) : {};

  return (
    <input
      type="hidden"
      name={name}
      defaultValue={value}
      {...registerProps}
      {...(onChange && { onChange: onChange })}
    />
  );
};

export default InputHidden;
