import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, userActions } from 'entities/user'
import i18n from 'shared/config/i18n/i18n'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

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
		localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(responce.data))
		thunkApi.dispatch(userActions.setAuthData(responce.data))

		return responce.data
	} catch (error) {
		console.log(error)
		return thunkApi.rejectWithValue(i18n.t('Неверный логин или пароль'))
	}
})
