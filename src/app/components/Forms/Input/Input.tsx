import { InputProps } from '@/types/inputs';
import { InputDefault, InputHidden, InputTextarea, InputSelect } from './../../../components';

const Input: React.FC<InputProps> = props => {
  const { type, name, value, onChange } = props;

  if (type === 'hidden') {
    return <InputHidden name={name} value={value as string} onChange={onChange} />;
  }

  if (type === 'textarea') {
    return <InputTextarea {...props} />;
  }

  if (type === 'select') {
    return <InputSelect {...props} />;
  }

  return <InputDefault {...props} />;
};

export default Input;
