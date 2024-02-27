import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User } from 'entities/user'

interface LoginByUsernameProps {
	username: string
	password: string
}

export const loginByUsername = createAsyncThunk<
	User,
	LoginByUsernameProps,
	{ rejectValue: string }
>('login/loginByUsername', async (authData, thunkApi) => {
	try {
		const responce = await axios.post<User>(
			'http://localhost:8000/login',
			authData
		)

		if (!responce.data) {
			throw new Error()
		}

		return responce.data
	} catch (error) {
		console.log(error)
		return thunkApi.rejectWithValue('error')
	}
})
