import { createSlice } from '@reduxjs/toolkit'

export const selectedData = createSlice({
  name: 'selectedData',
  initialState: {
    selectedData: null,
  },
  reducers: {
    changeData: (state, action) => {
      state.selectedData = action.payload
    },
    removeData: (state) => {
      state.selectedData = null
    }
  }
})

export const { changeData, removeData } = selectedData.actions

export default selectedData.reducer