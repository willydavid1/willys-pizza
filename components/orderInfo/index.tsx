import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Message from "components/message";
import { useSelector } from "react-redux";
import { IState } from "redux/reducers/rootReducer";

export interface IValuesFood {
  foodName: string;
  name: string;
  phoneNumber: string;
}

type IngredientsProps = {
  callbackWhenOrderEnds?: (values: IValuesFood) => void;
  changeCurrentStep: (step: number) => void;
};

const OrderInfo = ({
  callbackWhenOrderEnds,
  changeCurrentStep,
}: IngredientsProps) => {
  const { totalPrice, totalItemsSelected, ingredientsSelected } = useSelector((state: IState) => ({
    totalPrice: state.orderFood.totalPrice,
    totalItemsSelected: state.orderFood.totalItemsSelected,
    ingredientsSelected: state.orderFood.ingredientsSelected
  }));

  const formik = useFormik({
    initialValues: {
      foodName: "",
      name: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      foodName: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(20, "Must be 20 characters or less")
        .required("Required *"),
      name: Yup.string()
        .min(5, "Must be at least 5 characters")
        .max(20, "Must be 20 characters or less")
        .required("Required *"),
      phoneNumber: Yup.string()
        .min(8, "Must be at least 8 characters")
        .max(10, "Must be 10 characters")
        .required("Required *"),
    }),
    onSubmit: (values) => {
      callbackWhenOrderEnds && callbackWhenOrderEnds(values);
      const payloadForBackend = {
        values,
        totalPrice,
        totalItemsSelected,
        ingredientsSelected: Object.entries(ingredientsSelected).filter(([_, value]) => !!value.quantity).map(([ingredient, data]) => ({ ingredient, data })),
        ingredientsThatWereRemovedAfterSelection: Object.entries(ingredientsSelected).filter(([_, value]) => value.quantity === 0).map(([ingredient, data]) => ({ ingredient, data }))
      }

      console.log('This should be a request POST saving the data: ', payloadForBackend)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
      <div className="p-2 border transition duration-150 ease-in-out focus-within:border-yellow-400 rounded-md border-gray-200">
        <label
          htmlFor="foodName"
          className="text-sm text-yellow-600 font-light placeholder-gray-200"
        >
          Write the name of your pizza
        </label>
        <input
          className="mb-1 p-1.5 w-full text-yellow-800 bg-yellow-100 focus:bg-yellow-200 transition duration-150 ease-in-out outline-none text-base font-light rounded-md"
          id="foodName"
          name="foodName"
          type="text"
          placeholder="Pizza's willy"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.foodName}
          autoComplete="off"
        />
        {formik.touched.foodName && formik.errors.foodName && (
          <Message typeMessage="error" text={formik.errors.foodName} />
        )}
      </div>

      <div className="p-2 border transition duration-150 ease-in-out focus-within:border-yellow-400 rounded-md border-gray-200">
        <label
          className="text-sm text-yellow-600 font-light placeholder-gray-200"
          htmlFor="name"
        >
          Your name
        </label>
        <input
          autoComplete="off"
          className="mb-1 p-1.5 w-full text-yellow-800 bg-yellow-100 focus:bg-yellow-200 transition duration-150 ease-in-out outline-none text-base font-light rounded-md"
          id="name"
          name="name"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <Message typeMessage="error" text={formik.errors.name} />
        )}
      </div>

      <div className="p-2 border transition duration-150 ease-in-out focus-within:border-yellow-400 rounded-md border-gray-200">
        <label
          className="text-sm text-yellow-600 font-light placeholder-gray-200"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          className="mb-1 p-1.5 w-full text-yellow-800 bg-yellow-100 focus:bg-yellow-200 transition duration-150 ease-in-out outline-none text-base font-light rounded-md"
          id="phoneNumber"
          name="phoneNumber"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <Message typeMessage="error" text={formik.errors.phoneNumber} />
        )}
      </div>

      <div className="flex flex-col items-end">
        <h1>Total: {totalPrice}</h1>
        <button
          type="button"
          className="text-xs my-1 text-blue-700 underline"
          onClick={() => changeCurrentStep(1)}
        >
          See Ingredients
        </button>
      </div>

      <button
        type="submit"
        className="disabled:opacity-50 flex-1  text-gray-50 text-lg bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 rounded-lg py-2"
      >
        Order - (look at the console)
      </button>
    </form>
  );
};

export default OrderInfo;
