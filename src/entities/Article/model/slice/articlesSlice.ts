import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchArticles } from '../services/fetchArticles/fetchArticles'
import { Article } from '../types/article'
import { ArticlesSchema } from '../types/articleDetailsSchema'

const initialState: ArticlesSchema = {
	isLoading: false,
	error: undefined,
	data: undefined,
}
const articlesSlice = createSlice({
	name: 'articles',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchArticles.pending, state => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(
				fetchArticles.fulfilled,
				(state, action: PayloadAction<Article[]>) => {
					state.isLoading = false
					state.data = action.payload
				}
			)
			.addCase(fetchArticles.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { actions: articlesActions } = articlesSlice
export const { reducer: articlesReducer } = articlesSlice
