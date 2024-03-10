import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'
import { Profile } from '../../types/profile'

export const fetchProfileData = createAsyncThunk<
	Profile,
	void,
	ThunkConfig<string>
>('profile/fetchProfileData', async (_, { extra, rejectWithValue }) => {
	try {
		const responce = await extra.api.get<Profile>('/profile')

		return responce.data
	} catch (error) {
		return rejectWithValue(i18n.t('error'))
	}
})
