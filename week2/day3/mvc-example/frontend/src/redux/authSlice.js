import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + "/api/auth/login", { email, password} );
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

export const register = createAsyncThunk("auth/register", async ({ username, email, password }) => {
    try {
        const response = await axios.post(process.env.REACT_APP_BASE_URL + "/api/auth/register", { username, email, password });
        return response.data;
    } catch (error) {
        console.log(error);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: null,
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            (action) => [login.pending, register.pending].includes(action.type),
            (state) => {
                state.loading = true;
                state.error = null;
            }
        );

        builder.addMatcher(
            (action) => [login.fulfilled, register.fulfilled].includes(action.type),
            (state, action) => {
                state.loading = false;
                state.data = action.payload;
            }
        );

        builder.addMatcher(
            (action) => [login.rejected, register.rejected].includes(action.type),
            (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }
        )
    }
});

export default authSlice.reducer;