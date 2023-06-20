import { useState } from 'react'

type props = {
  icon?: any
  placeholder?: string
  value?: string | number| undefined
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  bg?: string
  label1?: any
  label2?: any
  label2_tailwind?: string
  tailwind?: string
  id?: string
  defaultValue?: string | number
  disabled?: any
}

const PfsIconInputOne: React.FC<props> = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  bg = '[#f1f1f1]',
  label1,
  label2,
  label2_tailwind,
  tailwind,
  id,
  defaultValue,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const formatValue = (inputValue: string | number | undefined) => {
    if (typeof inputValue === 'number') {
      return inputValue.toLocaleString('en-US')
    } else if (typeof inputValue === 'string') {
      return inputValue
    } else {
      return '' // or provide a default value that suits your requirements
    }
  }

  return (
    <div className="w-full">
      <div className="text-sm font-semibold">{label1}</div>
      <div
        className={`relative my-1 border-black w-full ${
          isFocused ? 'bg-gray-200' : ''
        }`}
      >
        <div className="absolute inset-y-0 left-0 flex text-sm items-center pl-3 pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          className={` ${tailwind} text-gray-900 bg-[#f1f1f1] border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 ${
            isFocused ? 'bg-gray-300' : ''
          }`}
          placeholder={placeholder}
          value={formatValue(value || '')}
          onChange={onChange}
          defaultValue={defaultValue}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <p className={` ${label2_tailwind} text-xs text-gray-500 `}>{label2}</p>
    </div>
  )
}

export default PfsIconInputOne
