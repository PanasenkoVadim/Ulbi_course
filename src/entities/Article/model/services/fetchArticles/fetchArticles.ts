import { createAsyncThunk } from '@reduxjs/toolkit'
import { Article } from '../../types/article'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'

export const fetchArticles = createAsyncThunk<
	Article[],
	void,
	ThunkConfig<string>
>('aticleDetails/fetchArticles', async (_, { extra, rejectWithValue }) => {
	try {
		const responce = await extra.api.get<Article[]>(`/articles`)

		return responce.data
	} catch (error) {
		return rejectWithValue(i18n.t('error'))
	}
})
