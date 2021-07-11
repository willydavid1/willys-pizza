import Ingredients from "components/ingredients";
import Steps from "components/steps";

const Order = () => {
  const steps = [
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
      title: "Payments",
    },
    {
      value: 4,
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
        1- Add your ingredients, 2- Add your Address/Info and enjoy Willy&apos;s
        pizza <br />
      </p>

      <div className="my-4">
        <Steps steps={steps}>
          {({ currentStep, switchToNext }) => {
            switch (currentStep) {
              case 1:
                return <Ingredients onClickButtonOrder={switchToNext} />
              case 2:
                return <h1>2</h1>
              case 3:
                return <h1>3</h1>
              default:
                return null
            }
          }}
        </Steps>
      </div>
    </>
  );
};

export default Order;
