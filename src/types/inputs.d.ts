export interface BaseInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  value?: string | number | boolean;
  error?: string;
}

export interface InputEventProps<T = HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<T>) => void;
  onInput?: (e: React.FormEvent<T>) => void;
  onBlur?: (e: React.FocusEvent<T>) => void;
  onFocus?: (e: React.FocusEvent<T>) => void;
}

export interface TextInputProps extends BaseInputProps, InputEventProps<HTMLInputElement> {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'hidden';
  min?: number;
  max?: number;
  icon?: string;
}

export interface TextareaProps extends BaseInputProps, InputEventProps<HTMLTextAreaElement> {
  type: 'textarea';
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

export interface InputHiddenProps {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputSelectProps extends BaseInputProps {
  type: 'select';
  options: { value: string; label: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export type InputProps = TextInputProps | TextareaProps | InputSelectProps;
