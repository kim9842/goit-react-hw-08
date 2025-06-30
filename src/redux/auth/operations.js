import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authentificationInstance = axios.create({
  baseURL: "https://connections-api.goit.global",
});

const setAuthHeader = (token) => {
  authentificationInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  authentificationInstance.defaults.headers.common.Authorization = "";
};

export const registrationThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authentificationInstance.post(
        "/users/signup",
        credentials
      );
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await authentificationInstance.post(
        "/users/login",
        credentials
      );
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (__, thunkAPI) => {
    try {
      await authentificationInstance.post("/users/logout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const refreshUserThunk = createAsyncThunk(
  "refresh",
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().authorization.token;
    if (!savedToken) {
      return thunkAPI.rejectWithValue("Unable to fetch user!");
    }
    setAuthHeader(savedToken);

    try {
      const response = await authentificationInstance.get("/users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
