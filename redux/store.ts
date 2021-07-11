import { createStore, Store, applyMiddleware } from "redux";
import { createWrapper, Context } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "redux/reducers/rootReducer";

const middlewares: Array<any> = [thunk];
const initialState: object = {};

const makeStore = (context: Context) =>
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

export const wrapper = createWrapper<Store>(makeStore, { debug: false });
