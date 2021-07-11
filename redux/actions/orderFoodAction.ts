import { typesActions, ITypesActions } from "redux/tools";
import { IState } from "redux/reducers/rootReducer";
import { IIng } from "redux/reducers/orderFoodReducer";
import { Dispatch } from "redux";
import axios from "axios";
import { store } from "react-notifications-component";

interface IGetIngredients {
  type:
    | ITypesActions["GET_INGREDIENTS"]
    | ITypesActions["GET_INGREDIENTS_SUCCESS"]
    | ITypesActions["GET_INGREDIENTS_ERROR"];
  payload?: any;
}

interface IAddIngredient {
  type: ITypesActions["ADD_INGREDIENT"];
  payload?: any;
}

interface IDecreaseIngredient {
  type: ITypesActions["ADD_INGREDIENT"];
  payload?: any;
}

interface IClearAll {
  type: ITypesActions["CLEAR_ALL"];
}

export const getIngredients =
  ({ food = "pizza" }) =>
  async (dispatch: Dispatch<IGetIngredients>) => {
    dispatch({
      type: typesActions.GET_INGREDIENTS,
    });
    try {
      const { data: payload } = await axios.get(
        `/api/ingredients/${encodeURIComponent(food)}`
      );
      dispatch({
        type: typesActions.GET_INGREDIENTS_SUCCESS,
        payload,
      });
      store.addNotification({
        title: "Success fetching data",
        message: "=)",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    } catch (error) {
      dispatch({
        type: typesActions.GET_INGREDIENTS_ERROR,
        payload: {
          message: error?.message,
        },
      });
      store.addNotification({
        title: "Error fetching data",
        message: "=(",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  };

export const addIngredient =
  (ing: IIng) =>
  async (dispatch: Dispatch<IAddIngredient>, getState: () => IState) => {
    const stateIngredients = getState().orderFood.ingredientsSelected;
    const quantity = stateIngredients?.[ing.ing]?.quantity
      ? stateIngredients?.[ing.ing]?.quantity + 1
      : 1;
    const productsCart = {
      ...stateIngredients,
      [ing.ing]: {
        ...stateIngredients?.[ing.ing],
        quantity,
        name: ing.ing,
        totalValue: quantity * ing.price,
      },
    };
    dispatch({
      type: typesActions.ADD_INGREDIENT,
      payload: productsCart,
    });
  };

export const decreaseIngredient =
  (ing: IIng) =>
  async (dispatch: Dispatch<IDecreaseIngredient>, getState: () => IState) => {
    const stateIngredients = getState().orderFood.ingredientsSelected;
    const quantity =
      stateIngredients?.[ing.ing]?.quantity &&
      stateIngredients?.[ing.ing]?.quantity > 0
        ? stateIngredients?.[ing.ing]?.quantity - 1
        : 1;

    const productsCart = {
      ...stateIngredients,
      [ing.ing]: {
        ...stateIngredients?.[ing.ing],
        quantity,
        name: ing.ing,
        totalValue: quantity * ing.price,
      },
    };

    dispatch({
      type: typesActions.DECREASE_INGREDIENT,
      payload: productsCart,
    });
  };

export const clearAll = () => async (dispatch: Dispatch<IClearAll>) => {
  dispatch({
    type: typesActions.CLEAR_ALL,
  });
};
