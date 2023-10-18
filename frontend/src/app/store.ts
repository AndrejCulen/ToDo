
import { configureStore } from '@reduxjs/toolkit'
import selectedData from './reducer'

const store = configureStore({
  reducer: selectedData
})

export default store