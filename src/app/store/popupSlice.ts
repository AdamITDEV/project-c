import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PopupState {
  message: string
  isVisible: boolean
}

const initialState: PopupState = {
  message: '',
  isVisible: false,
}

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, action: PayloadAction<string>) {
      state.message = action.payload
      state.isVisible = true
    },
    hidePopup(state) {
      state.isVisible = false
    },
  },
})

export const { showPopup, hidePopup } = popupSlice.actions

export default popupSlice.reducer
