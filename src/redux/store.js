import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./auth-reducer";
import catalogReducer from "./catalog-reducer";

const reducers = combineReducers({
  auth: authReducer,
  catalog: catalogReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

/* const store = createStore(reducers, applyMiddleware(thunkMiddleware));
;*/
export default store;
