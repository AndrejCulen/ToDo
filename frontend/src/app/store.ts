
import { configureStore } from '@reduxjs/toolkit'
import selectedData from './selectedData'
import activeTab from './activeTab'

const store = configureStore({
  reducer: {
    selectedData,
    activeTab
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>