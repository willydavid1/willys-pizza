import Ingredients from "components/ingredients";
import Steps, { ISteps } from "components/steps";
import OrderInfo from "components/orderInfo";
import Delivery from "components/delivery";

const Order = () => {
  const steps: Array<ISteps> = [
    {
      value: 1,
      title: "Ingredients",
    },
    {
      value: 2,
      title: "Info",
    },
    {
      value: 3,
      title: "Delivery",
    },
  ];

  return (
    <>
      <h1 className="text-center py-4 text-xl font-semibold text-yellow-400">
        Order your pizza here
      </h1>
      <p className="text-sm text-gray-500">
        Food ordering steps: <br />
        1- Add your ingredients, <br />
        2- Add your Address/Info and enjoy Willy&apos;s
        pizza
      </p>

      <div className="my-4">
        <Steps steps={steps}>
          {({ changeCurrentStep, currentStep, switchToNext }) => {
            switch (currentStep) {
              case 1:
                return <Ingredients onClickButtonOrder={switchToNext} />;
              case 2:
                return (
                  <OrderInfo
                    changeCurrentStep={changeCurrentStep}
                    callbackWhenOrderEnds={switchToNext}
                  />
                );
              case 3:
                return <Delivery />;
              default:
                return null;
            }
          }}
        </Steps>
      </div>
    </>
  );
};

export default Order;
