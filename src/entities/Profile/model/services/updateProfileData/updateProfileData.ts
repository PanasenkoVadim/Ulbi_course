import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profile'

interface UpdateProfileDataProps {
	username: string
	password: string
}

export const updateProfileData = createAsyncThunk<
	Profile,
	Profile,
	ThunkConfig<string>
>(
	'login/updateProfileData',
	async (data, { dispatch, extra, rejectWithValue }) => {
		try {
			const responce = await extra.api.post<Profile>('/profile', data)

			if (!responce.data) {
				throw new Error()
			}

			return responce.data
		} catch (error) {
			return rejectWithValue(i18n.t('error'))
		}
	}
)
