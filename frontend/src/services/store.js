import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/userSlice";
import GameReducer from "../features/gameSlice";

export default configureStore({
  reducer: {
    user: UserReducer,
    game: GameReducer,
  },
});
