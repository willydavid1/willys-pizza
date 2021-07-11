import { combineReducers } from "redux";
import orderFoodReducer, {
  IStateOrderFood,
} from "redux/reducers/orderFoodReducer";

export interface IState {
  orderFood: IStateOrderFood;
}

const rootReducer = combineReducers({
  orderFood: orderFoodReducer,
});

export default rootReducer;
