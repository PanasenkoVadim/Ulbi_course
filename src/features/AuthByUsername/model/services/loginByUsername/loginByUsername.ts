import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
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
	ThunkConfig<string>
>(
	'login/loginByUsername',
	async (authData, { dispatch, extra, rejectWithValue }) => {
		try {
			const responce = await extra.api.post<User>('/login', authData)

			if (!responce.data) {
				throw new Error()
			}
			localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(responce.data))
			dispatch(userActions.setAuthData(responce.data))
			extra.navigate('/profile')
			return responce.data
		} catch (error) {
			return rejectWithValue(i18n.t('Неверный логин или пароль'))
		}
	}
)
