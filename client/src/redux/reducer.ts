import { combineReducers } from "redux";

import { reducer as uploadReducer } from "slices/upload";

const rootReducer = combineReducers({
  uploadReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
