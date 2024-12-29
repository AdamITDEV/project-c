import { configureStore, createSlice } from '@reduxjs/toolkit'

const popupSlice = createSlice({
  name: 'popup',
  initialState: { visible: false },
  reducers: {
    showPopup: (state) => {
      state.visible = true
    },
    hidePopup: (state) => {
      state.visible = false
    },
  },
})

export const { showPopup, hidePopup } = popupSlice.actions

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
