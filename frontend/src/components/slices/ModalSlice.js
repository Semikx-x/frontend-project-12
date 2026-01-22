import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modals',
  initialState: { 
    isOpen: false,
    type: null,
    extraData: null
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.extraData = action.payload.extraData;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.extraData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer