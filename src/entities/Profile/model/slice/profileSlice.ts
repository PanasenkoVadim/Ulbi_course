import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
	data: undefined,
	formData: undefined,
	isLoading: false,
	error: undefined,
	readonly: true,
}
const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setReadonly: (state, action: PayloadAction<boolean>) => {
			state.readonly = action.payload
		},
		cancelEdit: state => {
			state.readonly = true
			state.formData = state.data
			state.validateProfileError = undefined
		},
		updateProfile: (state, action: PayloadAction<Profile>) => {
			state.formData = { ...state.formData, ...action.payload }
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
					state.formData = action.payload
				}
			)
			.addCase(fetchProfileData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload
			})
			.addCase(updateProfileData.pending, state => {
				state.validateProfileError = undefined
				state.isLoading = true
			})
			.addCase(
				updateProfileData.fulfilled,
				(state, action: PayloadAction<Profile>) => {
					state.isLoading = false
					state.data = action.payload
					state.formData = action.payload
					state.readonly = true
					state.validateProfileError = undefined
				}
			)
			.addCase(updateProfileData.rejected, (state, action) => {
				state.isLoading = false
				state.validateProfileError = action.payload
			})
	},
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
