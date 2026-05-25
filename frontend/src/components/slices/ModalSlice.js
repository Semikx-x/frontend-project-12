import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: { 
    editing: { isOpen: false, extraData: null },
    delete: { isOpen: false, extraData: null },
    adding: { isOpen: false, extraData: null },
    isEdit: false
  },
  reducers: {
    openEditModal: (state, action) => {
      state.editing.isOpen = true;
      state.editing.extraData = action.payload.extraData;
    },
    openDeleteModal: (state, action) => {
      state.delete.isOpen = true;
      state.delete.extraData = action.payload.extraData;
    },
    openAddModal: (state, action) => {
      state.adding.isOpen = true;
      state.adding.extraData = action.payload.extraData;
    },
    closeEditModal: (state) => {
      state.editing.isOpen = false;
      state.editing.extraData = null;
    },
    closeDeleteModal: (state) => {
      state.delete.isOpen = false;
      state.delete.extraData = null;
      state.editing.isOpen = false;
      state.editing.extraData = null;
    },
    closeAddModal: (state) => {
      state.adding.isOpen = false;
      state.adding.extraData = null;
    },
    turnOnEdit: (state) => {
      state.isEdit = !state.isEdit
      console.log(state.isEdit)
    }
  },
});

export const { openEditModal, openAddModal, openDeleteModal, closeAddModal, closeDeleteModal, closeEditModal, turnOnEdit } = modalsSlice.actions;

export default modalsSlice.reducer

export const selectEditing = (state) => state.modals.editing
export const selectDelete = (state) => state.modals.delete
export const selectAdding = (state) => state.modals.adding
export const selectIsEdit = (state) => state.modals.isEdit