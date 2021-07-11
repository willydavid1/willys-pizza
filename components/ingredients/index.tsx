import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredients as getIngredientsAction,
  decreaseIngredient as decreaseIngredientAction,
  addIngredient as addIngredientAction,
} from "redux/actions/orderFoodAction";
import { IIng } from "redux/reducers/orderFoodReducer";
import Counter from "components/counter";
import { IState } from "redux/reducers/rootReducer";
import Loader from 'components/loader'

type IngredientsProps = {
  food?: string;
  onClickButtonOrder?: () => void;
  maximumValueToSelect?: number;
};

const Ingredients = ({
  food,
  onClickButtonOrder,
  maximumValueToSelect = 15,
}: IngredientsProps) => {
  const dispatchRedux = useDispatch();
  const {
    ingredientsData: { data, isLoading, error },
    ingredientsSelected,
    totalPrice,
    totalItemsSelected,
  } = useSelector((state: IState) => ({
    ingredientsData: state.orderFood.ingredientsData,
    ingredientsSelected: state.orderFood.ingredientsSelected,
    totalPrice: state.orderFood.totalPrice,
    totalItemsSelected: state.orderFood.totalItemsSelected,
  }));

  const conditionToSave: boolean = totalItemsSelected < maximumValueToSelect;

  useEffect(() => {
    if (!data?.length) {
      dispatchRedux(getIngredientsAction({ food }));
    }
  }, []);

  const changeValueElement = (operation: string, ing: IIng): void => {
    if (operation === "add") {
      dispatchRedux(addIngredientAction(ing));
      return;
    }
    dispatchRedux(decreaseIngredientAction(ing));
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && (
        <div className="py-5 bg-red-500 text-white rounded-lg">
          <h1 className="text-center">Error =(</h1>
        </div>
      )}

      <ul className="space-y-2 max-h-60 md:max-h-80 overflow-auto">
        {data.map((elem) => (
          <li key={elem.ing}>
            <div className="flex items-center bg-gray-200 p-3 rounded-lg hover:bg-gray-300">
              <h5 className="text-yellow-600 capitalize">{elem.ing}</h5>
              <h6 className="text-yellow-500 ml-2 text-sm">{elem.price}</h6>
              <div className="ml-auto">
                <Counter
                  value={ingredientsSelected?.[elem.ing]?.quantity ?? 0}
                  onChangeValue={(operation) =>
                    changeValueElement(operation, elem)
                  }
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-end m-2">
        <h1>Total: {totalPrice}</h1>
      </div>

      <button
        disabled={conditionToSave || isLoading}
        onClick={() => onClickButtonOrder && onClickButtonOrder()}
        className="disabled:opacity-50 w-full text-gray-50 text-lg bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 rounded-lg py-2"
      >
        Next
      </button>
      {conditionToSave && (
        <span className="text-xs text-gray-500">
          You must add at least 15 ingredients
        </span>
      )}
    </div>
  );
};

export default Ingredients;
