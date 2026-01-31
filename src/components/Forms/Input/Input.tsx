import { InputProps } from '@/types/inputs';
import { InputDefault, InputHidden, InputTextarea, InputSelect, InputCheckbox } from '@/components';

const Input: React.FC<InputProps> = props => {
  const { type, name, value, onChange } = props;

  if (type === 'hidden') {
    return <InputHidden name={name} value={value as string} onChange={onChange} />;
  } else if (type === 'textarea') {
    return <InputTextarea {...props} />;
  } else if (type === 'select') {
    return <InputSelect {...props} />;
  } else if (type === 'checkbox') {
    return <InputCheckbox {...props} />;
  } else {
    return <InputDefault {...props} />;
  }
};

export default Input;
