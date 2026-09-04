import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: ReactNode;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

function findEnabledOption(options: SelectOption[], direction: 1 | -1): number {
  const start = direction === 1 ? 0 : options.length - 1;
  for (let offset = 0; offset < options.length; offset += 1) {
    const index = start + offset * direction;
    if (!options[index]?.disabled) return index;
  }
  return 0;
}

export function Select({
  options,
  value,
  defaultValue = '',
  onValueChange,
  placeholder = 'Select an option',
  label,
  disabled = false,
  className,
  name,
  id: providedId,
}: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const listboxId = `${id}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : uncontrolled;
  const selectedOption = options.find((option) => option.value === selectedValue);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, []);

  const choose = (option: SelectOption) => {
    if (option.disabled) return;
    if (!isControlled) setUncontrolled(option.value);
    onValueChange?.(option.value);
    setOpen(false);
  };

  const move = (direction: 1 | -1) => {
    if (!options.length) return;
    let next = activeIndex;
    do {
      next = (next + direction + options.length) % options.length;
    } while (options[next]?.disabled && next !== activeIndex);
    setActiveIndex(next);
  };

  const openMenu = (direction: 1 | -1 = 1) => {
    const selectedIndex = options.findIndex((option) => option.value === selectedValue && !option.disabled);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : findEnabledOption(options, direction));
    setOpen(true);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      if (!open) openMenu(direction);
      else move(direction);
    } else if ((event.key === 'Enter' || event.key === ' ') && open) {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) choose(option);
    } else if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(findEnabledOption(options, 1));
    } else if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(findEnabledOption(options, -1));
    } else if (event.key === 'Escape') {
      if (!open) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    }
  };

  const toggleMenu = () => {
    if (open) setOpen(false);
    else openMenu();
  };

  return (
    <div className={cn('bits-component bits-field', className)}>
      {label && <label className="bits-field__label" id={`${id}-label`}>{label}</label>}
      <div ref={rootRef} className="bits-select" data-open={open}>
        {name && <input type="hidden" name={name} value={selectedValue} />}
        <button
          id={id}
          type="button"
          className="bits-select__trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={label ? `${id}-label ${id}` : undefined}
          aria-activedescendant={open && options[activeIndex] ? `${listboxId}-option-${activeIndex}` : undefined}
          disabled={disabled}
          onClick={toggleMenu}
          onKeyDown={onKeyDown}
        >
          <span className={cn('bits-select__value', !selectedOption && 'bits-select__placeholder')}>
            {selectedOption?.label ?? placeholder}
          </span>
          <span aria-hidden="true" className="bits-select__caret">▼</span>
        </button>
        {open && (
          <div id={listboxId} className="bits-select__menu" role="listbox" aria-labelledby={label ? `${id}-label` : id}>
            {options.map((option, index) => (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={selectedValue === option.value}
                aria-disabled={option.disabled || undefined}
                className="bits-select__option"
                data-active={activeIndex === index}
                onPointerDown={(event) => event.preventDefault()}
                onPointerEnter={() => !option.disabled && setActiveIndex(index)}
                onClick={() => choose(option)}
              >
                <span>{option.label}</span>
                {selectedValue === option.value && <span aria-hidden="true" className="bits-select__check">●</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
