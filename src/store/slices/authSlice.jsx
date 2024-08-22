import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogIn: false,
    isVerified: false,
    userName: '',
    userEmail: '',
    userNumber: '',
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userSignIn: (state, action) => {
            const { user } = action.payload;
            // console.log('userSLiceUSer', user)

            state.isLogIn = true;
            state.isVerified = user.emailVerified
            state.userEmail = user.email;
        },
        userLogOut: (state, action) => {
            const isLogIn = action.payload;
            // console.log(isLogIn, 'login(isLogin)')
            state.isLogIn = isLogIn;
            // console.log('logOutState', state.isLogIn)
        },
        userProfile: (state, action) => {
            const { name, email, number } = action.payload;
            console.log('userSLiceUSerName', name)
            state.userName = name;
            state.userProfile = email;
            state.userNumber = number;
        }
    }

})

export const { userSignUp, userSignIn, userLogOut, userProfile } = authSlice.actions

export const isLoginSelector = createSelector(
    (state) => state.authSlice,
    (authSlice) => authSlice.isLogIn
);

export default authSlice.reducer