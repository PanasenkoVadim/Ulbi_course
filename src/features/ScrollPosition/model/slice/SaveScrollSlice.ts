import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ScrollPositionSchema } from '../types/ScrollPositionSchema'

const initialState: ScrollPositionSchema = {
	scroll: {},
}

const ScrollPositionSlice = createSlice({
	name: 'scrollPosition',
	initialState,
	reducers: {
		setScrollPosition: (
			state,
			{ payload }: PayloadAction<{ path: string; position: number }>
		) => {
			state.scroll[payload.path] = payload.position
		},
	},
})

export const { actions: ScrollPositionActions } = ScrollPositionSlice
export const { reducer: ScrollPositionReducer } = ScrollPositionSlice
