import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    userScore: 0,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserScore: (state, action) => {
      state.userScore = action.payload;
    },
  },
});

export const { setUserId, setUserScore } = userSlice.actions;

export default userSlice.reducer;
