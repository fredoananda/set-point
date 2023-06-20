import React, { useState, useEffect } from 'react'

import PfsButtonOne from '../atoms/Pfs_ButtonOne'
import PfsIconInputOne from '../atoms/Pfs_IconInputOne'
import PfsMainInputOne from '../atoms/Pfs_MainInputOne'

interface props {
  onSubmit?: () => void
  labelOne?: string
  lableTwo?: string
}

const PfsCardTwo: React.FC<props> = ({ onSubmit, labelOne, lableTwo }) => {
  // console.log(labelOne)
  const [valuee, setValuee] = useState({
    transaction: '',
    point: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const handleButtonClick = () => {
    setIsEditing(!isEditing)
  }
  return (
    <div
      style={{ boxShadow: '-1px 0px 5px 0px rgba(0,0,0,0.25)' }}
      className="bg-white rounded-lg shadow-md p-5  w-auto   md:max-w-[40rem] mt-5"
    >
      <div className="flex flex-col items-center md:flex-row justify-between mb-6">
        <div>
          <h2 className="text-sm font-semibold mb-2">GET POINTS</h2>
        </div>
        <div className="w-full md:w-1/3 pl-0 md:pl-10 mt-4 md:mt-0">
          <PfsButtonOne
            label={isEditing ? 'UPDATE' : 'CHANGE'}
            onClick={handleButtonClick}
            bg="primary-100"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <div>
          <h2 className="text-sm  ">Minimum transaction</h2>
        </div>
        <PfsIconInputOne
          type="number"
          icon={<p className="font-semibold">¥</p>}
          tailwind={`text-center ${!valuee.transaction && 'italic'} `}
          placeholder="Enter a transaction"
          bg="gray-200"
          value={valuee.transaction}
          onChange={(e) =>
            setValuee({ ...valuee, transaction: e.target.value })
          }
        />
        <div>
          <h2 className="text-sm ">gets</h2>
        </div>
        <PfsMainInputOne
          type="number"
          tailwind={`text-center ${!valuee.point && 'italic'}`}
          placeholder="Enter point"
          value={valuee.point}
          onChange={(e) => setValuee({ ...valuee, point: e.target.value })}
        />
        <div>
          <h2 className="text-sm  ">points</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between  gap-8">
        <div className="flex items-center md:mr-8">
          <p className="text-center text-xs font-medium ">
            applicable multiples
          </p>
        </div>
      </div>
    </div>
  )
}

export default PfsCardTwo
