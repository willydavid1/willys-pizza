import { useState } from "react";

export interface ISteps {
  value: number;
  title: string;
}

interface Options {
  currentStep: number;
  switchToNext: () => void;
  changeCurrentStep: (stepValue: number) => void;
}

type StepsProps = {
  steps: Array<ISteps>;
  children?: (options: Options) => any;
};

const Steps = ({ steps = [], children }: StepsProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const totalSteps: number = steps.length;

  const changeCurrentStep = (currentValue: number): void => {
    setCurrentStep(currentValue);
  };

  const switchToNext = (): void => {
    const newValue: number = currentStep + 1;
    setCurrentStep(totalSteps >= newValue ? newValue : currentStep);
  };

  return (
    <>
      <div className="w-full flex space-x-2 mb-3">
        {steps.map((elem: ISteps, index: number) => (
          <div
            className={`flex items-center ${
              index + 1 !== totalSteps ? "flex-1" : "flex-initial"
            }`}
            key={elem.value}
          >
            <div
              className={`px-2 min-w-6 rounded-full text-white ${
                elem.value <= currentStep ? "bg-yellow-300" : "bg-gray-300"
              }`}
            >
              {elem.value}
            </div>
            <h4 className="ml-2 text-gray-600 hidden text-sm md:block">
              {elem.title}
            </h4>
            {index + 1 !== totalSteps && (
              <div
                className={`ml-2 w-full ${
                  elem.value <= currentStep - 1
                    ? "bg-yellow-200"
                    : "bg-gray-300"
                }`}
                style={{ height: 2 }}
              />
            )}
          </div>
        ))}
      </div>
      {children && children({ currentStep, switchToNext, changeCurrentStep })}
    </>
  );
};

export default Steps;
