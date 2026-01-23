import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
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

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer

export const selectOpen = (state) => state.modals.isOpen
export const selectType = (state) => state.modals.type
export const selectExtraData = (state) => state.modals.extraData