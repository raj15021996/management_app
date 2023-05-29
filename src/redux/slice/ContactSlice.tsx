import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactState {
  contactDetail: Contact[];
}

const initialState: ContactState = {
  contactDetail: [],
};

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContactToRedux: (state, action: PayloadAction<Contact>) => {
      state.contactDetail.push(action.payload);
    },
    deleteContactFromRedux: (state, action: PayloadAction<string>) => {
      const deleteById = action.payload;
      state.contactDetail = state.contactDetail.filter(
        (contact) => contact.id !== deleteById
      );
    },
    editContactInRedux: (state, action: PayloadAction<Contact>) => {
      const updatedContact = action.payload;
      const index = state.contactDetail.findIndex(contact => contact.id === updatedContact.id);
      if (index !== -1) {
        state.contactDetail[index] = updatedContact;
      }
    },
  },
});

export const {
  addContactToRedux,
  deleteContactFromRedux,
  editContactInRedux,
} = contactSlice.actions;

export default contactSlice.reducer;
