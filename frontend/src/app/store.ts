
import { configureStore } from '@reduxjs/toolkit'
import selectedData from './reducer'
import editingSlice from './editing'

const store = configureStore({
  reducer: {
    selectedData,
    editing: editingSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>