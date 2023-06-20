import PfsButtonOne from '../atoms/Pfs_ButtonOne'
import PfsIconInputOne from '../atoms/Pfs_IconInputOne'
import numeral from 'numeral'

import { useState } from 'react'

interface props {
  onSubmit?: () => void
  labelOne?: string
  labelTwo?: string
  value?: any
  input1Placeholder?: string
}

const PfsCardOne: React.FC<props> = ({
  onSubmit,
  labelOne,
  input1Placeholder,
  value,
  labelTwo,
}) => {
  const [valuee, setValuee] = useState<props['value']>(value)
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    const formattedValue = numeral(rawValue).format('0,0')
    setValuee(formattedValue)
  }
  const [isEditing, setIsEditing] = useState(false)
  const handleButtonClick = () => {
    setIsEditing(!isEditing)
  }
  return (
    <form
      style={{ boxShadow: '-1px 0px 5px 0px rgba(0,0,0,0.25)' }}
      className="bg-white rounded-lg shadow-md p-5 mt-5 w-auto md:max-w-[40rem]"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div>
          <h2 className="text-sm font-semibold mb-2">{labelOne}</h2>
        </div>
        <div className="w-full md:w-1/3 pl-0 md:pl-10 mt-4 md:mt-0">
        <PfsButtonOne
                  label={isEditing ? 'UPDATE' : 'CHANGE'}
                  onClick={handleButtonClick}
                  bg="primary-100"
                />
        </div>
      </div>
      <div className="flex flex-col border-black md:w-3/5 md:flex-row justify-between items-center mb-2 gap-8">
        <PfsIconInputOne
          icon={<p className="font-semibold">¥</p>}
          type="text"
          tailwind={`${!valuee && 'italic'}`}
          placeholder={input1Placeholder}
          value={valuee}
          onChange={handleValueChange}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        <div className="flex items-center md:mr-8">
          <p className=" text-xs">{labelTwo}</p>
        </div>
      </div>
    </form>
  )
}

export default PfsCardOne
