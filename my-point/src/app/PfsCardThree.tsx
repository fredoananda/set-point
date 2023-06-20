import React, { useState } from 'react';
import PfsButtonOne from '../atoms/Pfs_ButtonOne';
import PfsIconInputOne from '../atoms/Pfs_IconInputOne';
import PfsMainInputOne from '../atoms/Pfs_MainInputOne';

interface Props {
  payment_fee?: number;
  persen_payment_fee?: number;
  onClick?: () => void;
  onChange_payment_fee?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange_persen_payment_fee?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PfsCardThree: React.FC<Props> = ({
  onChange_persen_payment_fee,
  onChange_payment_fee,
  payment_fee = 0,
  persen_payment_fee = 0,
  onClick,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPaymentFee, setEditedPaymentFee] = useState(
    payment_fee !== undefined ? payment_fee.toLocaleString() : ''
  );
  const [editedPersenPaymentFee, setEditedPersenPaymentFee] = useState(
    persen_payment_fee !== undefined ? persen_payment_fee.toString() : ''
  );

  const handleChangePaymentFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = Number(e.target.value.replace(/[^0-9.-]+/g, ''));
    const formattedPaymentFee = inputNumber.toLocaleString();
    setEditedPaymentFee(formattedPaymentFee);
    if (onChange_payment_fee) {
      onChange_payment_fee(e);
    }
  };

  const handleChangePersenPaymentFee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPersenPaymentFee(e.target.value);
    if (onChange_persen_payment_fee) {
      onChange_persen_payment_fee(e);
    }
  };

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
    if (onClick) {
      onClick();
    }
  };

  const renderPriceMessage = () => {
    if (!payment_fee) {
      return <span className="italic text-gray-500">Enter a price</span>;
    }
    return null;
  };

  return (
    <div
      style={{ boxShadow: '-1px 0px 5px 0px rgba(0,0,0,0.25)' }}
      className="bg-white rounded-lg shadow-md p-5 md:max-w-[40rem] mt-5"
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-sm font-semibold mb-2">PAYMENT FEE</h2>
        </div>
        <div className="w-full md:w-1/3 pl-0 md:pl-10 mt-4 md:mt-0">
          <PfsButtonOne
            label={isEditing ? 'UPDATE' : 'CHANGE'}
            bg="primary-100"
            onClick={handleButtonClick}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
        <div className="flex md:mr-8">
          <PfsMainInputOne
            placeholder="Enter a Percentage"
            type="text"
            onChange={handleChangePersenPaymentFee}
            value={editedPersenPaymentFee}
            label2={
              <p className="text-center">
                Please update by yourself, for example 10% or what percentage of
                the payment section
              </p>
            }
          />
          <h1 className="text-xl mt-3 font-semibold ml-2">%</h1>
        </div>
        <PfsIconInputOne
          icon="¥"
          type="text"
          onChange={handleChangePaymentFee}
          value={editedPaymentFee}
          placeholder="Enter a Price"
          label2={
            <p className="text-center">
              Please update by yourself according to the PayPal/payment
              gateway system, for example ¥550 or how much.
            </p>
          }
          disabled={!isEditing}
        />
      </div>
      {renderPriceMessage()}
    </div>
  );
};

export default PfsCardThree;
