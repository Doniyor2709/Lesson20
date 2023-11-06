import { configureStore } from "@reduxjs/toolkit";
import experiencesQuery, {
  experiencesName,
  experiencesReducer,
} from "../queries/experiences";
import { Provider } from "react-redux";
import usersQuery, { usersName, usersReducer } from "../queries/users";
import educationsQuery, {
  educationsName,
  educationsReducer,
} from "../queries/educations";

const reducer = {
  [experiencesName]: experiencesReducer,
  [usersName]: usersReducer,
  [educationsName]: educationsReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      experiencesQuery.middleware,
      usersQuery.middleware,
      educationsQuery.middleware,
    ]),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
