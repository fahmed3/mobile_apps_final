import { createStore, applyMiddleware } from "redux";
import { persistStore,persistReducer } from 'redux-persist'
import { createLogger } from 'redux-logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

import taskReducer from "./taskReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, taskReducer);

const store = createStore(
  persistedReducer,
  applyMiddleware(
    createLogger(),
  ),
);

let persistor = persistStore(store);

// export default store;
export {
  store,
  persistor,
};