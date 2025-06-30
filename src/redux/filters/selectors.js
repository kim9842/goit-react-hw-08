import { createSelector } from "@reduxjs/toolkit";
import { getContacts, selectFilter } from "../contacts/selectors";

export const selectFilteredContacts = createSelector(
  [getContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
export const getFilter = (state) => {
  return state.filter.text;
};
