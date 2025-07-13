'use client';

import { useFormContext, UseFormReturn, FieldValues } from 'react-hook-form';
import { InputSelectProps } from '@/types/inputs';
import { useState, useRef, useEffect } from 'react';
import { Icon, Text, Label } from '../../../components';
import css from './InputSelect.module.scss';

const InputSelect: React.FC<InputSelectProps> = ({
  options,
  placeholder,
  disabled,
  name,
  label,
  required,
  error: propsError,
  value,
  onChange,
}) => {
  let formContext: UseFormReturn<FieldValues> | null = null;
  try {
    formContext = useFormContext();
  } catch {
    formContext = null;
  }

  const error = formContext ? formContext.formState.errors[name] : propsError;

  const registerProps = formContext ? formContext.register(name) : {};
  const [selectedValue, setSelectedValue] = useState<string>(typeof value === 'string' ? value : '');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleOptionClick = (optionValue: string) => {
    setSelectedValue(optionValue);
    //setIsOpen(false);

    if (onChange) {
      const syntheticEvent = {
        target: { value: optionValue, name },
        currentTarget: { value: optionValue, name },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }

    if (formContext) {
      formContext.setValue(name, optionValue);
      formContext.trigger(name);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, true); // capture phase
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isOpen]);

  return (
    <Label label={label} required={required} error={typeof error === 'string' ? error : (error as any)?.message}>
      <div className={`${css.InputSelect} ${isOpen ? css.Open : ''} ${disabled ? css.Disabled : ''}`} ref={selectRef}>
        <input type="hidden" name={name} value={selectedValue} {...registerProps} />
        <button
          type="button"
          className={`${css.Button} ${isOpen ? css.Open : ''} ${error ? css.Invalid : ''}`}
          onClick={() => {
            if (!disabled) {
              setIsOpen(prev => !prev);
            }
          }}
        >
          <Text className={`${css.Label} ${selectedOption ? css.Selected : ''}`} light size="small" color="grey">
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <span className={css.Icon}>
            <Icon name="arrow-down" size="20" />
          </span>
        </button>

        {isOpen && (
          <div className={css.Dropdown}>
            <div className={css.DropdownScrollArea}>
              <ul>
                {options.map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option.value)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Label>
  );
};

export default InputSelect;
