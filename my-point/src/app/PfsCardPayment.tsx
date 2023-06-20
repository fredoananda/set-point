import { useState } from "react";
 
interface props {
  onSubmit?: () => void;
  label1?: string;
  label2?: string;
  id:string;
  OnValue?: boolean 
}


const PfsCardPayment: React.FC<props> = ({ OnValue,onSubmit, label1, label2, id }) => {
   
  const [switchOn, setSwitchOn] = useState(OnValue ? OnValue : false)

  const handleSwitchToggle = () => {
    {onSubmit ? onSubmit() : setSwitchOn(!switchOn)}
  }
   
  return (
    <div className='w-1/3 border-black'>
      <div className="flex border-black">
        <div className=" w-10 flex items-center  border-black">
          <p
            className={` border-black  text-sm ${ (OnValue ? OnValue : switchOn )? 'text-[#4082DE]' : 'text-gray-300'
              } font-semibold`}
          >
            {(OnValue ? OnValue : switchOn) ? 'ON' : 'OFF'}
          </p>
        </div>
        <div className="relative">
          <label
            htmlFor={id}
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                id={id}
                type="checkbox"
                className="sr-only"
                checked={OnValue ? OnValue : switchOn}
                onChange={handleSwitchToggle}
              />

              <div
                className={`block  w-14 h-8 rounded-full ${ (OnValue ?  OnValue : switchOn )? 'bg-[#4082DE]' : 'bg-gray-300'
                  }`}
              />
              <div
                className={`dot  absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${ (OnValue ? OnValue : switchOn)
                  ? 'transform translate-x-full bg-[#4082DE]'
                  : ''
                  }`}
              />
            </div>
          </label>
        </div>
      </div>
      <div
        className={`text-lg ${ (OnValue ? OnValue : switchOn) ? 'text-[#4082DE]' : 'text-gray-300'
          } `}
      >
        <div>
          <div  style={{ boxShadow: "-1px 0px 5px 0px rgba(0,0,0,0.25)" }} className="bg-white rounded-lg mt-2 p-4 md:w-full h-48 flex flex-col justify-center items-center text-4xl font-bold">
            <p className='px-8   md:px-16'>

              { label1 }
            </p>
            <p className='font-normal text-sm px-6'>{ label2 }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PfsCardPayment







