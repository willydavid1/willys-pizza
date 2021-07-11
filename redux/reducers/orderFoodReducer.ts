import { typesActions } from 'redux/tools'
import { AnyAction } from "redux";

export interface IIng {
  ing: string;
  price: number;
}

export interface IIngSelected {
  quantity: number;
  name: string;
  totalValue: number;
}

export interface IStateOrderFood {
  customerName: string;
  date: Date | null;
  ingredientsSelected: { [name: string]: IIngSelected} ;
  ingredientsData: {
    isLoading: boolean;
    data: Array<IIng>;
    error: any;
  };
  nameFood: string;
  phone: number | string;
  totalPrice: number;
  totalItemsSelected: number
}

const initialState: IStateOrderFood  = {
  customerName: '',
  date: null,
  ingredientsSelected: {},
  ingredientsData: {
    isLoading: false,
    data: [],
    error: null
  },
  nameFood: '',
  phone: '',
  totalPrice: 0,
  totalItemsSelected: 0,
};

const orderFoodReducer = (
  state: IStateOrderFood = initialState,
  action: AnyAction
) => {
  switch (action.type) {
    case typesActions.GET_INGREDIENTS:
      return {
        ...state,
        ingredientsData: {
          ...state.ingredientsData,
          ...initialState.ingredientsData,
          isLoading: true
        }
      };

    case typesActions.GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredientsData: {
          ...state.ingredientsData,
          data: Object.entries(action.payload).map(([key, value]) => ({
            ing: key,
            price: value,
          })),
          error: null,
          isLoading: false,
        }
      };

    case typesActions.GET_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredientsData: {
          ...state.ingredientsData,
          error: action.payload,
          isLoading: false,
        }
      };
    
    case typesActions.DECREASE_INGREDIENT:
    case typesActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredientsSelected: {
          ...state.ingredientsSelected,
          ...action.payload
        },
        totalPrice: Object.values(action.payload).reduce((prev: number, elem: any) => prev + elem.totalValue, 0),
        totalItemsSelected: Object.values(action.payload).reduce((prev: number, elem: any) => prev + elem.quantity, 0)
      };

    default:
      return state;
  }
};

export default orderFoodReducer;
