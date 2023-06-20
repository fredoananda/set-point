import React, { useState, useEffect } from "react";
import AdminLayout from "../app/AdminLayout";
import PfsButtonTwo from "../app/PfsButtonTwo";
import PfsCardOne from "../app/PfsCardOne";
import PfsCardTwo from "../app/PfsCardTwo";
import PfsButtonOne from "../app/PfsButtonOne";
import PfsMainInputOne from "../app/PfsMainInputOne";
import PfsIconInputOne from "../app/PfsIconInputOne";
import PfsRadio from "../app/PfsRadio";
import PfsCardThree from "../app/PfsCardThree";
import PfsCardFour from "../app/PfsCardFour";
import PfsCardPayment from "../app/PfsCardPayment";

function PFS_TripPost() {
  const [paypal, setPaypal] = useState<boolean>(false);
  const [other, setOther] = useState<boolean>(false);
  const [free, setFree] = useState<boolean>(false);
  const [data, setData] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [transactionValue, setTransactionValue] = useState("");
  const [valuee, setValuee] = useState({ point: "" });
  const [usePointSystem, setUsePointSystem] = useState(true); // Default to "Add Point System"
  const [points, setPoints] = useState("");
  const [shippingOption, setShippingOption] = useState("including");
  const handleRadioChange1 = (option: string) => {
    setShippingOption(option);
    if (option === "excluding") {
      setShippingPrice(0);
    }
  };
  const [shippingPrice, setShippingPrice] = useState<number | "">(0);

  const [price, setPrice] = useState<string>(""); // Mengubah tipe data menjadi string
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value.replace(/,/g, ""); // Menghapus semua tanda koma
    const formattedPrice = Number(inputNumber).toLocaleString(); // Memformat angka dengan tanda koma
    setPrice(formattedPrice);
  };
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = event.target.value.replace(/,/g, ""); // Menghapus semua tanda koma
    const parsedPrice = parseFloat(inputNumber); // Mengubah string menjadi angka desimal
    setShippingPrice(parsedPrice);
  };
  const handleInputChange = (event: any) => {
    setPoints(event.target.value);
  };
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRadioId = event.target.id;
    const value = event.target.value === "add_point_system";
    setUsePointSystem(value);
    setPoints(value ? "" : "0"); // Set points to empty string or '0' based on the selection
    if (selectedRadioId === "add_point_system") {
      setUsePointSystem(true);
    } else if (selectedRadioId === "without_point_system") {
      setUsePointSystem(false);
    }
  };

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };
  const handleSwitchFree = () => {
    setFree(!free);
  };

  const handleSwitchPaypal = () => {
    setPaypal(!paypal);
  };
  const handleSwitchOther = () => {
    setOther(!other);
  };

  useEffect(() => {
    if (paypal === true || other === true) {
      setFree(false);
    }
  }, [paypal, other]);

  useEffect(() => {
    if (free === true) {
      setPaypal(false);
      setOther(false);
    }
  }, [free]);
  return (
    <AdminLayout>
      <div className="px-4 py-2 md:px-12 md:py-4   ">
        <h1 className="text-2xl font-bold mb-8">TRIP POST</h1>
        <div className="w-full">
          <h1 className="text-xl font-bold mb-8 ">Trip Posting Cost</h1>

          <PfsCardOne
            labelOne="TRIP POSTING COST (JPY)"
            labelTwo="Please update by yourself according to the paypal / payment gateway system, for example 2 % or how much."
            input1Placeholder="Enter trip posting cost"
          />

          <PfsCardTwo />
        </div>

        <div className="w-auto max-w-[1000px] border-black">
          <h1 className="text-xl font-semibold  mt-10">
            Connect to a payment gateway
          </h1>
          <div>
            <div className="bg-white rounded-lg w-full mt-3 flex   gap-8">
              <PfsCardPayment
                OnValue={free}
                onSubmit={handleSwitchFree}
                id="a1"
                label1="FREE"
                label2="(without payment gateway)"
              />
              <PfsCardPayment
                OnValue={paypal}
                onSubmit={handleSwitchPaypal}
                id="a2"
                label1="PAYPAL"
              />
              <PfsCardPayment
                OnValue={other}
                onSubmit={handleSwitchOther}
                id="a3"
                label1="OTHER"
              />
            </div>
          </div>
        </div>

        <div className=" py-2 md:py-4 mt-20 ">
          <div className="w-full">
            <h1 className="text-xl font-bold mb-8 ">
              Transaction Between Assistant and Requestor
            </h1>

            <PfsCardThree
              payment_fee={data?.payment_fee}
              persen_payment_fee={data?.persen_payment_fee}
              onChange_payment_fee={(e: any) =>
                setData({
                  ...data,
                  payment_fee: parseInt(e.target.value).toLocaleString("en-US"),
                })
              }
            />

            <PfsCardFour
              payment_fee={data?.payment_fee}
              persen_payment_fee={data?.persen_payment_fee}
              onChange_payment_fee={(e: any) =>
                setData({
                  ...data,
                  payment_fee: parseInt(e.target.value).toLocaleString("en-US"),
                })
              }
            />

            <div
              style={{ boxShadow: "-1px 0px 5px 0px rgba(0,0,0,0.25)" }}
              className="bg-white rounded-lg shadow-md p-5  w-auto   md:max-w-[40rem] mt-5"
            >
              <div className="flex flex-col items-center md:flex-row justify-between mb-6">
                <div>
                  <h2 className="text-sm font-semibold mb-2">GET POINTS</h2>
                </div>
                <div className="w-full md:w-1/3 pl-0 md:pl-10 mt-4 md:mt-0">
                  <PfsButtonOne
                    label={isEditing ? "UPDATE" : "CHANGE"}
                    onClick={handleButtonClick}
                    bg="primary-100"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
                <div>
                  <h2 className="text-sm">Minimum transaction</h2>
                </div>
                <PfsIconInputOne
                  type="number"
                  placeholder="Enter a transaction"
                  value={transactionValue}
                  bg="gray-200"
                  onChange={(event) => setTransactionValue(event.target.value)}
                />
                <div>
                  <h2 className="text-sm ">gets</h2>
                </div>
                <PfsMainInputOne
                  type="number"
                  placeholder="Enter point"
                  value={valuee.point}
                  onChange={(e) =>
                    setValuee({ ...valuee, point: e.target.value })
                  }
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
          </div>

          <div className="w-auto max-w-[1000px] border-black">
            <h1 className="text-xl font-semibold  mt-10">
              Connect to a payment gateway
            </h1>
            <div>
              <div className="bg-white rounded-lg w-full mt-3 flex   gap-8">
                <PfsCardPayment
                  id="a4"
                  label1="FREE"
                  label2="(without payment gateway)"
                />
                <PfsCardPayment id="a5" label1="PAYPAL" />
                <PfsCardPayment id="a6" label1="OTHER" />
              </div>
            </div>
          </div>
        </div>

        <section className=" w-auto max-w-[850px] border-red-400 mb-20 pt-10 ">
          <p className="font-semibold  text-xl  ">Simulation</p>

          <section className="p-10 border border-gray-300 rounded-xl mt-5">
            <div className="mb-6 grid gap-6 border-black  md:grid-cols-2">
              <PfsMainInputOne
                type="text"
                placeholder="¥ 500"
                bg="gray-200"
                tailwind="font-bold"
                label1="TRIP POSTING COST (JPY)"
                disabled
              />
              <PfsMainInputOne
                type="text"
                placeholder="USD 20.0"
                bg="gray-200"
                tailwind="font-bold"
                label1="‎"
                label2="The amounts shown above are estimates and
                  adjusted to the prevailing exchange rate system."
                label2_tailwind="text-right"
                disabled
              />
            </div>
            <div style={{ backgroundColor: "#D00000" }}>
              <button
                className={`text-white focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 w-full focus:outline-none `}
                disabled
              >
                POST
              </button>
            </div>
          </section>

          <section className="mt-5 p-12 border border-gray-300 rounded-xl">
            <div>
              <div className="mt-6 border-black">
                <label htmlFor="" className="text-sm font-semibold flex">
                  POINT SYSTEM <span className="block text-primary-100">*</span>
                </label>
                <div className="flex gap-4">
                  <PfsRadio
                    id="add_point_system"
                    label1="Add Point System"
                    label2="(Add points for your item so that requestors are interested in your assist)"
                    checked={usePointSystem}
                    onChange={handleRadioChange}
                  />
                  <PfsRadio
                    id="without_point_system"
                    label1="Without using point system"
                    value="0"
                    checked={!usePointSystem}
                    onChange={handleRadioChange}
                    disabled={false} // Set readOnly to true when "Add Point System" is selected
                  />
                </div>
              </div>

              <div className="mt-6 border-black">
                <PfsIconInputOne
                  type="number"
                  label1={
                    <label
                      htmlFor="input-group-1"
                      className="text-sm font-semibold flex"
                    >
                      POINTS <span className="block text-primary-100">*</span>
                    </label>
                  }
                  icon={
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/012/598/212/original/currency-coin-cartoon-png.png"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      alt="icon"
                    />
                  }
                  placeholder="Enter points"
                  label2="Please enter the number of points starting from 1 until as many as you like for this assist."
                  disabled={!usePointSystem} // Disable input when not using point system
                  value={points}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <PfsMainInputOne
              type="text"
              label1={
                <p className="flex text-sm">
                  ITEM PRICE (JPY){" "}
                  <span className="block text-primary-100">*</span>
                </p>
              }
              placeholder="Enter a price"
              label2="*Iroiro Station doesn’t accept cash on delivery."
              label2_tailwind="text-end"
              label3="Recommended price: ¥ 1 - ¥ 9,999,999"
              value={price}
              onChange={handlePriceChange}
            />

            <div>
              <div className="mt-6 border-black">
                <label htmlFor="" className="text-sm font-semibold flex">
                  CHOOSE SHIPPING CATEGORY{" "}
                  <span className="block text-primary-100">*</span>
                </label>
                <div className="flex gap-4">
                  <PfsRadio
                    id="including_shipping"
                    label1="Including international shipping"
                    label2="(Free shipping until the items arrive at the destination)"
                    disabled={false} // Aktifkan komponen radio button
                    checked={shippingOption === "including"}
                    value="including"
                    onChange={() => handleRadioChange1("including")}
                  />
                  <PfsRadio
                    id="excluding_shipping"
                    label1="Excluding international shipping"
                    label2="(For shipping payments can be billed later)"
                    disabled={false} // Aktifkan komponen radio button
                    checked={shippingOption === "excluding"}
                    value="excluding"
                    onChange={() => handleRadioChange1("excluding")}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor=""
                  className="text-sm font-semibold grid grid-cols-2 justify-between items-end"
                >
                  <p className="text-sm font-semibold flex">
                    SHIPPING PRICE{" "}
                    <span className="block text-primary-100">*</span>
                  </p>
                  <p className="font-normal text-gray-500 text-xs text-right">
                    You can enter the highest shipping cost to anticipate if the
                    packages weight exceeds the expected weight.
                  </p>
                </label>
                <div>
                  <label htmlFor="shippingPri2ce" className="sr-only">
                    Enter shipping price
                  </label>
                  <PfsMainInputOne
                    id="shippingPrice"
                    type="text"
                    placeholder="Enter shipping price"
                    value={
                      shippingPrice !== "" ? shippingPrice.toLocaleString() : ""
                    }
                    onChange={handleInputChange1}
                    readonly={shippingOption === "excluding"}
                  />
                </div>
              </div>
            </div>

            <PfsButtonTwo label="ESTIMATE" />

            <div className="mt-6">
              <PfsIconInputOne
                tailwind="font-bold"
                icon={<p className="font-bold">¥</p>}
                type="number"
                bg="gray-200"
                label1="AMOUNT OF PAYMENT YOU WILL GET"
                label2="Amount that shown is estimate only. The amount you will receive may different due to the applicable system. Therefore, we recommend you to charge higher prices for item and shipping than the actual prices in anticipation."
                placeholder="3,000"
              />
            </div>

            <div className="mt-6">
              <PfsMainInputOne
                type="text"
                bg="gray-200"
                label1="PAYMENT METHOD"
                placeholder="PayPal"
                disabled
              />
            </div>

            <div className="mt-6">
              <PfsIconInputOne
                icon="¥"
                type="text"
                bg="gray-200"
                label1="PAYMENT FEE"
                placeholder="3,000"
                disabled
              />
            </div>

            <div className="mt-6">
              <PfsIconInputOne
                icon="¥"
                type="number"
                bg="gray-200"
                label1="SYSTEM FEE"
                placeholder="3,000"
              />
            </div>
            <div>
              <div className="mt-6 border-black">
                <label htmlFor="" className="text-sm font-semibold flex">
                  POINT SYSTEM <span className="block text-primary-100">*</span>
                </label>
                <div className="flex gap-4">
                  <PfsRadio
                    id="add_point_system"
                    label1="Add Point System"
                    label2="(Add points for your item so that requestors are interested in your assist)"
                    checked={usePointSystem}
                    onChange={handleRadioChange}
                  />
                  <PfsRadio
                    id="without_point_system"
                    label1="Without using point system"
                    value="0"
                    checked={!usePointSystem}
                    onChange={handleRadioChange}
                    disabled={false} // Set readOnly to true when "Add Point System" is selected
                  />
                </div>
              </div>

              <div className="mt-6 border-black">
                <PfsIconInputOne
                  type="number"
                  label1={
                    <label
                      htmlFor="input-group-1"
                      className="text-sm font-semibold flex"
                    >
                      POINTS <span className="block text-primary-100">*</span>
                    </label>
                  }
                  placeholder="Enter points"
                  label2="Please enter the number of points starting from 1 until as many as you like for this assist."
                  disabled={!usePointSystem} // Disable input when not using point system
                  value={points}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="my-6">
              <div className="grid gap-6 md:grid-cols-2">
                <PfsIconInputOne
                  icon="¥"
                  type="text"
                  bg="gray-200"
                  label1="PRICE GIVEN TO REQUESTOR"
                  placeholder="3,000"
                />
                <PfsIconInputOne
                  icon="$"
                  type="text"
                  bg="gray-200"
                  label1="‎"
                  placeholder="28,08"
                  label2="The amounts shown above are estimates and adjusted to the prevailing exchange rate system."
                  label2_tailwind="text-end"
                />
              </div>
            </div>

            <PfsButtonOne bg="primary-200" label="CONFIRM PRICE" />
          </section>
        </section>
      </div>
    </AdminLayout>
  );
}

export default PFS_TripPost;
