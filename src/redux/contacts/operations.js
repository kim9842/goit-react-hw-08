import { createAsyncThunk } from "@reduxjs/toolkit";
import { authentificationInstance } from "../auth/operations";

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await authentificationInstance.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContactThunk = createAsyncThunk(
  "contacts/add",
  async (contact, thunkAPI) => {
    try {
      const response = await authentificationInstance.post(
        "/contacts",
        contact
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  "contacts/delete",
  async (contactId, thunkAPI) => {
    try {
      await authentificationInstance.delete(`/contacts/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async (contact, thunkAPI) => {
    try {
      const response = await authentificationInstance.patch(
        "/contacts",
        contact
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
