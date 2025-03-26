import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types";
import { UsersService } from "../userServices";

interface UserState {
    currentUser: User | null;
}

const initialState: UserState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUser: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            if (state.currentUser?.userId === action.payload.userId) {
                UsersService.updateUser(action.payload);
                state.currentUser = action.payload;
            }
        },
    },
});

export const { setCurrentUser, updateUser } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
