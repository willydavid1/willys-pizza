import { useState, useEffect } from "react";
import { IoBicycleSharp } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import { useDispatch } from "react-redux";
import { clearAll as clearAllAction } from "redux/actions/orderFoodAction";
import Countdown from "react-countdown";
import Link from "next/link";

const Delivery = () => {
  const [showFinished, setShowFinished] = useState<boolean>(false);

  const dispatchRedux = useDispatch();

  useEffect(() => clearData, [])

  const clearData = (): void => {
    dispatchRedux(clearAllAction());
  };

  const renderer = ({ seconds }: { seconds: number }) => {
    return <span>{seconds}S</span>;
  };

  const renderIsLoading = (
    <div className="h-40 flex flex-col items-center justify-center bg-yellow-400 my-10 rounded-lg">
      <IoBicycleSharp className="text-5xl animate-pulse text-white" />
      <h1 className="text-center mt-2 text-white capitalize">
        Your order will arrive in approximately{" "}
        <Countdown
          onComplete={() => setShowFinished(true)}
          renderer={renderer}
          date={Date.now() + 5000}
        />
      </h1>
    </div>
  );
  const renderFinished = (
    <div className="h-52 relative flex flex-col items-center justify-center bg-yellow-400 my-10 rounded-lg">
      <IoMdHappy className="text-6xl text-white" />
      <h1 className="text-center mt-2 text-white capitalize">
        Thanks for trusting us
      </h1>
      <div className="flex space-x-2 my-3">
        <button
          onClick={clearData}
          className="text-gray-50 text-lg bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 rounded-lg py-2 px-4"
        >
          Clear the store
        </button>
        <Link href="/">
          <a className="text-gray-50 text-lg bg-yellow-300 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 rounded-lg py-2 px-4">
            Exit
          </a>
        </Link>
      </div>
    </div>
  );
  return showFinished ? renderFinished : renderIsLoading;
};

export default Delivery;
