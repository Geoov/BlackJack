import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    gameId: null,
  },
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
  },
});

export const { setGameId } = gameSlice.actions;

export default gameSlice.reducer;
