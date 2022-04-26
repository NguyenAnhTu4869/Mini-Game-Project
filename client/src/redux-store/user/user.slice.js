import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: 0,
    userName: "",
    userEmail: "",
    userTimes: 0,
    userScore: 0,
    isLogin: false,
    isAccepted: false,
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUserInfo(state, action) {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
            state.isLogin = true;
        },
        updateUserTime(state, action) {
            state.userTimes = action.payload.userTimes;
        },
        updateUserScore(state, action) {
            state.userScore = action.payload.userScore;
        },
        updateAcceptedExchange(state, action) {
            state.isAccepted = action.payload.isAccepted;
        },
        logoutUser() {
            return initialState;
        }
    },
})

export const userActions = userSlice.actions;

export default userSlice;
