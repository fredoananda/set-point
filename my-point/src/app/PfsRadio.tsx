type Props = {
    bg?: string;
    id?: string;
    label1?: string;
    label2?: any;
    value?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
  };
  
  const PfsRadio: React.FC<Props> = ({
    id,
    label1,
    value,
    checked,
    onChange,
    label2,
    bg = "blue-500",
    disabled,
  }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onChange) {
        onChange(e);
      }
    };
  
    return (
      <div className="flex items-center">
        <input
          id={id}
          type="radio"
          name={id}
          checked={checked}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={`w-4 h-4 text-${bg} bg-gray-100 border-gray-300 focus:ring-${bg}`}
        />
  
        <label
          htmlFor={id}
          className={`ml-4 text-sm text-gray-900 dark:text-gray-300 ${
            disabled ? "text-gray-500" : ""
          }`}
        >
          {label1}
          {label2 && <span className="block text-xs text-primary-100">{label2}</span>}
        </label>
      </div>
    );
  };
  
  export default PfsRadio;
  