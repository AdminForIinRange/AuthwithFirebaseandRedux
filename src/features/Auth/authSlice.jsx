import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "../../Config/Firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  emailInUse: false,
  invalidCredential: false,
  hasNotPasswordVerified: false
  
};

export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        email: results.user.email,
        isAuth: true,
      };
      return authInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithEmailPassword = createAsyncThunk(
  "auth/signInWithEmailPassword",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const authInfo = {
        userID: user.uid,
        email: user.email,
        isAuth: true,
      };
      return authInfo;
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        dispatch(setinvalidCredential(true)); // Dispatch action to set emailInUse to true
      }
      return rejectWithValue(error.message );
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async ({ email, password }, { rejectWithValue, dispatch }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const authInfo = {
        userID: user.uid,
        email: user.email,
        isAuth: true,
      };
      return authInfo;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        dispatch(setEmailInUse(true)); // Dispatch action to set emailInUse to true
      }
      return rejectWithValue(error.message );
    }
  }
);



export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      // No need to log state.user here, as it's not relevant to the functionality
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmailInUse(state, action) {
      state.emailInUse = action.payload;
    },
    setinvalidCredential(state, action) {
      state.invalidCredential = action.payload;
    },

    sethasNotPasswordVerified(state, action){
      state.hasNotPasswordVerified = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signInWithEmailPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInWithEmailPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInWithEmailPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        if (action.payload.code === "auth/invalid-credential") {
          state.invalidCredential = true;
        }
      })
      .addCase(registerWithEmailAndPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerWithEmailAndPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
 
        
      })
      .addCase(registerWithEmailAndPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        if (action.payload.code === "auth/email-already-in-use") {
          state.emailInUse = true;
        }
      });
      
  },
});

export const { setEmailInUse, setinvalidCredential, sethasNotPasswordVerified } = authSlice.actions;

export default authSlice.reducer;
