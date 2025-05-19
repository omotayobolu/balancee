import { useState, useRef, useEffect, forwardRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Controller } from "react-hook-form";

const SelectBase = forwardRef(
  ({ options, value, onChange, placeholder, className, error, label }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(dropdownRef.current);
        } else {
          ref.current = dropdownRef.current;
        }
      }
    }, [ref]);

    const selectedOption = value;

    useEffect(() => {
      function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelectOption = (option) => {
      onChange(option);
      setIsOpen(false);
    };

    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        {label && (
          <label className="block mb-1 text-md font-medium text-dark-grey">
            {label}
          </label>
        )}
        <button
          type="button"
          className={`relative flex items-center justify-between w-full  p-3 text-left bg-white border cursor-pointer ${
            error ? "border-red" : "border-border"
          } ${isOpen && "border-border shadow-input"} rounded-lg `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block text-base ${
              !selectedOption ? "text-dark-grey" : ""
            }`}
          >
            {selectedOption || placeholder}
          </span>
          <div className="ml-2">
            <Icon
              icon="iconoir:nav-arrow-down"
              width="24"
              height="24"
              className={`transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </button>
        {error && <span className="text-xs text-red">{error}</span>}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-md max-h-60 overflow-y-auto">
            <ul className="py-1 px-4">
              {options.length > 0 ? (
                options.map((option) => (
                  <li
                    key={option}
                    className={`py-3 flex flex-row items-center gap-3 cursor-pointer text-dark-grey hover:text-grey border-b border-border ${
                      option === selectedOption ? " text-black font-medium" : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <p className="text-inherit">{option}</p>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

SelectBase.displayName = "SelectBase";

export function FormSelect({
  name,
  control,
  options,
  placeholder,
  className,
  rules,
  label,
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <SelectBase
          options={options}
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          className={className}
          error={error?.message}
          label={label}
          ref={field.ref}
        />
      )}
    />
  );
}

export default SelectBase;
