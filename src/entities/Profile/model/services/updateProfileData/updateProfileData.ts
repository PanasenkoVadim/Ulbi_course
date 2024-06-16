import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile, ValidateProfileError } from '../../types/profile'
import { getProfileFormData } from '../../selectors/getProfileFormData/getProfileFormData'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<ValidateProfileError[]>
>('login/updateProfileData', async (_, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi
	const formData = getProfileFormData(getState())
	const errors = validateProfileData(formData)
	if (errors.length) {
		return rejectWithValue(errors)
	}
	try {
		const responce = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData)

		if (!responce.data) {
			throw new Error()
		}

		return responce.data
	} catch (error) {
		return rejectWithValue([ValidateProfileError.SERVER_ERROR])
	}
})
