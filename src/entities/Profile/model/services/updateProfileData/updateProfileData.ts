import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profile'
import { getProfileFormData } from '../../selectors/getProfileFormData/getProfileFormData'

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<string>
>('login/updateProfileData', async (_, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi
	const formData = getProfileFormData(getState())
	try {
		const responce = await extra.api.put<Profile>('/profile', formData)

		if (!responce.data) {
			throw new Error()
		}

		return responce.data
	} catch (error) {
		return rejectWithValue(i18n.t('error'))
	}
})
