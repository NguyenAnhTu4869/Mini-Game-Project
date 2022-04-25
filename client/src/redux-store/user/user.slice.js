import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    userEmail: "",
    userTimes: 10,
    userScore: 0,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUserInfo(state, action) {
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
        },
        updateUserTime(state, action) {
            state.userTimes = action.payload.userTimes;
        },
        updateUserScore(state, action) {
            state.userScore = action.payload.userScore;
        }
    },
})

export const userActions = userSlice.actions;

export default userSlice;
