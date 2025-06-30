export const selectFilteredContacts = (state) => {
  const filter = state.filter.text.toLowerCase();
  return state.contacts.items.filter((contact) =>
    contact.name.toLowerCase().includes(filter)
  );
};
export const getContacts = (state) => {
  return state.contacts.items;
};
export const selectFilter = (state) => state.filter.text;
