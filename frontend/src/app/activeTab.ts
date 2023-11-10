import { createSlice } from '@reduxjs/toolkit'

export const activeTab = createSlice({
  name: 'activeTab',
  initialState: {
    activeTab: 'all',
  },
  reducers: {
    activeTabAll: (state) => {
        return {
            ...state,
            activeTab: 'all'
        }
    },
    activeTabDone: (state) => {
        return {
            ...state,
            activeTab: 'done'
        }
    },
    activeTabUndone: (state) => {
        return {
            ...state,
            activeTab: 'undone'
        }
    }
  }
})

export const { activeTabAll, activeTabDone, activeTabUndone } = activeTab.actions

export default activeTab.reducer