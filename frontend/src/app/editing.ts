import { createSlice } from '@reduxjs/toolkit'

export const editingSlice = createSlice({
  name: 'editing',
  initialState: {
    editing: false,
  },
  reducers: {
    startEditing: (state) => {
        state.editing = true
    },
    endEditing: (state) => {
        state.editing = false
      }
  }
})

export const { startEditing, endEditing } = editingSlice.actions

export default editingSlice.reducer