import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile, ValidateProfileError } from '../../types/profile'
import { getProfileFormData } from '../../selectors/getProfileFormData/getProfileFormData'
import { validateProfileData } from '../validateProfileData/validateProfileData'

export const updateProfileData = createAsyncThunk<
	Profile,
	string,
	ThunkConfig<ValidateProfileError[]>
>('login/updateProfileData', async (profileId, thunkApi) => {
	const { extra, rejectWithValue, getState } = thunkApi
	const formData = getProfileFormData(getState())
	const errors = validateProfileData(formData)
	if (errors.length) {
		return rejectWithValue(errors)
	}
	try {
		const responce = await extra.api.put<Profile>(`/profile/${profileId}`, formData)

		if (!responce.data) {
			throw new Error()
		}

		return responce.data
	} catch (error) {
		return rejectWithValue([ValidateProfileError.SERVER_ERROR])
	}
})
