import { useState } from "react";

interface StepsI {
  value: number;
  title: string;
  onClick?: (value: number) => void;
}

interface Options {
  currentStep: number,
  switchToNext: () => void
}

type StepsProps = {
  steps: Array<StepsI>;
  children?: (options: Options) => void;
};

const Steps = ({ steps = [], children }: StepsProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps: number = steps.length

  const changeCurrent = (currentValue: number): void => {
    setCurrentStep(currentValue);
  };

  const switchToNext = (): void => {
    const newValue: number = currentStep + 1
    setCurrentStep(totalSteps >= newValue ? newValue : currentStep);
  }
  console.log('render')

  return (
    <>
      <div className="w-full flex space-x-2">
        {steps.map((elem: StepsI, index: number) => (
          <div
            className={`flex items-center ${
              index + 1 !== totalSteps ? "flex-1" : "flex-initial"
            }`}
            key={elem.value}
          >
            <button
              className={`px-2 min-w-6 rounded-full text-white ${
                elem.value <= currentStep ? "bg-yellow-300" : "bg-gray-300"
              }`}
              onClick={() => {
                changeCurrent(elem.value);
                elem?.onClick && elem.onClick(elem.value);
              }}
            >
              {elem.value}
            </button>
            <h4 className="ml-2 text-gray-600 hidden text-sm md:block">
              {elem.title}
            </h4>
            {index + 1 !== totalSteps && (
              <div
                className={`ml-2 w-full ${
                  elem.value <= currentStep - 1 ? "bg-yellow-200" : "bg-gray-300"
                }`}
                style={{ height: 2 }}
              />
            )}
          </div>
        ))}
      </div>
      {children && children({ currentStep, switchToNext })}
    </>
  );
};

export default Steps;
