import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, provider } from "../../Config/Firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
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
  async ({ email, password }, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
    }
  }
);

export const registerWithEmailAndPassword = createAsyncThunk(
  "auth/registerWithEmailAndPassword",
  async ({ email, password }, { rejectWithValue }) => {
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
      return rejectWithValue(error.message);
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
    // You can add additional reducers here if needed
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
      });
  },
});

export default authSlice.reducer;
