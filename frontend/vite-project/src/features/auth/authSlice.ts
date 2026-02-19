import {createSlice,type PayloadAction} from "@reduxjs/toolkit";


interface User{
    id:string,
    name:string,
    email:string,
    role:string,
}


interface AuthState{
    token:string | null;
    user:User | null;

}

// Helper to safely parse user from localStorage
// 1. Get the saved user string from localStorage
const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  // 2. Parse the string back into an object
  user: savedUser ? JSON.parse(savedUser) : null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      
      // 3. Save both to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user)); 
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      // 4. Remove user on logout
      localStorage.removeItem("user"); 
    },
  },
});

export const {loginSuccess,logout} = authSlice.actions;
export default authSlice.reducer;

