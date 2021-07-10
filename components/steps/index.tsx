import { useState } from "react";

interface StepsI {
  value: number;
  title: string;
  onClick?: (value: number) => void;
}

type StepsProps = {
  steps: Array<StepsI>;
  children?: (currentStep: number) => void;
};

const Steps = ({ steps = [], children }: StepsProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const changeCurrent = (currentValue: number): void => {
    setCurrentStep(currentValue);
  };

  return (
    <div className="w-full flex space-x-2">
      {steps.map((elem: StepsI, index: number) => (
        <div
          className={`flex items-center ${
            index + 1 !== steps.length ? "flex-1" : "flex-initial"
          }`}
          key={elem.value}
        >
          <button
            className={`px-2 min-w-6 rounded-full text-white ${
              elem.value <= currentStep ? "bg-yellow-300" : "bg-gray-300"
            }`}
            onClick={() => {
              changeCurrent(elem.value);
              elem.onClick && elem.onClick(elem.value);
            }}
          >
            {elem.value}
          </button>
          <h4 className="ml-2 text-gray-600 hidden text-sm md:block">
            {elem.title}
          </h4>
          {index + 1 !== steps.length && (
            <div
              className={`ml-2 w-full ${
                elem.value <= currentStep - 1 ? "bg-yellow-200" : "bg-gray-300"
              }`}
              style={{ height: 2 }}
            />
          )}
        </div>
      ))}
      {children && children(currentStep)}
    </div>
  );
};

export default Steps;
