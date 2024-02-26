import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'

const initialState: LoginSchema = {
	username: '',
	password: '',
	isLoading: false,
	error: '',
}
const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUsername: (state, action: PayloadAction<string>) => {
			state.username = action.payload
		},
		setPassword: (state, action: PayloadAction<string>) => {
			state.password = action.payload
		},
	},
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
