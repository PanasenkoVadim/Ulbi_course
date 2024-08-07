import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'
import { ArticleSortField, ArticleType } from 'entities/Article'
import { SortOrder } from 'shared/types'

export const initArticlesPage = createAsyncThunk<
	void,
	URLSearchParams,
	ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searchParams, thunkApi) => {
	const { getState, dispatch } = thunkApi
	const sortFromUrl = searchParams.get('sort') as ArticleSortField
	const orderFromUrl = searchParams.get('order') as SortOrder
	const searchFromUrl = searchParams.get('search')
	const typeFromUrl = searchParams.get('type') as ArticleType

	if (sortFromUrl) {
		dispatch(articlesPageActions.setSort(sortFromUrl))
	}
	if (orderFromUrl) {
		dispatch(articlesPageActions.setOrder(orderFromUrl))
	}
	if (searchFromUrl) {
		dispatch(articlesPageActions.setSearch(searchFromUrl))
	}
	if (typeFromUrl) {
		dispatch(articlesPageActions.setType(typeFromUrl))
	}

	const inited = getArticlesPageInited(getState())
	if (!inited) {
		dispatch(articlesPageActions.initState())
		dispatch(fetchArticlesList({}))
	}
})
