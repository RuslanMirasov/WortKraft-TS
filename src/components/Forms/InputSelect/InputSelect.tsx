'use client';

import { useFormContext, useWatch } from 'react-hook-form';
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
  const formContext = useFormContext();

  const error = formContext.formState.errors[name] ?? propsError;

  const registerProps = formContext.register(name);
  const selectedValue = useWatch({
    control: formContext.control,
    name,
    defaultValue: typeof value === 'string' ? value : '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === selectedValue);

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>, optionValue: string) => {
    event.preventDefault();
    event.stopPropagation();

    if (onChange) {
      const syntheticEvent = {
        target: { value: optionValue, name },
        currentTarget: { value: optionValue, name },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }

    formContext.setValue(name, optionValue, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isOpen]);

  return (
    <Label label={label} required={required} error={typeof error === 'string' ? error : (error as any)?.message}>
      <div className={`${css.InputSelect} ${isOpen ? css.Open : ''} ${disabled ? css.Disabled : ''}`} ref={selectRef}>
        <input type="hidden" {...registerProps} value={selectedValue ?? ''} />
        <button
          type="button"
          className={`${css.Button} ${isOpen ? css.Open : ''} ${error ? css.Invalid : ''}`}
          onClick={() => {
            if (!disabled) {
              setIsOpen(prev => !prev);
            }
          }}
        >
          <Text className={css.Label} light size="small" color={selectedOption ? 'black' : 'grey'}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <span className={css.Icon}>
            <Icon name="arrow-down" size="20" />
          </span>
        </button>

        {isOpen && (
          <div className={css.Dropdown}>
            <div className={`${css.DropdownScrollArea} custom-scrollbar`}>
              <ul>
                {options.map((option, index) => (
                  <li key={index} onMouseDown={event => handleOptionClick(event, option.value)}>
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
