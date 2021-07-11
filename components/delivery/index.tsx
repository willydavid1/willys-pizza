import { useState } from "react";
import { IoBicycleSharp } from "react-icons/io5";
import { IoMdHappy } from "react-icons/io";
import Countdown from "react-countdown";

const Delivery = () => {
  const [showFinished, setShowFinished] = useState(false);
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
    <div className="h-40 relative flex flex-col items-center justify-center bg-yellow-400 my-10 rounded-lg">
      <IoMdHappy className="text-6xl text-white" />
      <h1 className="text-center mt-2 text-white capitalize">
        Thanks for trusting us
      </h1>
    </div>
  );
  return showFinished ? renderFinished : renderIsLoading;
};

export default Delivery;
