import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'

const initialState: ProfileSchema = {
	data: undefined,
	isLoading: false,
	error: undefined,
	readonly: true,
}
const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			if (state.data) {
				state.data.firstname = action.payload
			}
		},
		setLastname: (state, action: PayloadAction<string>) => {
			if (state.data) {
				state.data.lastname = action.payload
			}
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProfileData.pending, state => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(
				fetchProfileData.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.isLoading = false
					state.data = action.payload
				}
			)
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
	},
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
