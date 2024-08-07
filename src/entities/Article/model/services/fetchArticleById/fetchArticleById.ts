import { createAsyncThunk } from '@reduxjs/toolkit'
import { Article } from '../../types/article'
import { ThunkConfig } from 'app/providers/StoreProvider'
import i18n from 'shared/config/i18n/i18n'

export const fetchArticleById = createAsyncThunk<
	Article,
	string,
	ThunkConfig<string>
>('aticleDetails/fetchArticleById', async (articleId, thunkApi) => {
	const { extra, rejectWithValue } = thunkApi
	try {
		const responce = await extra.api.get<Article>(`/articles/${articleId}`, {
			params: {
				_expand: 'user',
			},
		})

		return responce.data
	} catch (error) {
		return rejectWithValue(i18n.t('error'))
	}
})
