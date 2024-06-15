import {
	PayloadAction,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Comment } from 'entities/Comment'
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'

const commentsAdapter = createEntityAdapter({
	selectId: (comment: Comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
	state => state.articleDetailsComments || commentsAdapter.getInitialState()
)

const ArticleDetailsCommentsSlice = createSlice({
	name: 'articleDetailsCommentsSlice',
	initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
		isLoading: false,
		error: undefined,
		ids: ['1', '2'],
		entities: {},
	}),
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCommentsByArticleId.pending, state => {
				state.error = undefined
				state.isLoading = true
			})
			.addCase(
				fetchCommentsByArticleId.fulfilled,
				(state, action: PayloadAction<Comment[]>) => {
					commentsAdapter.setAll(state, action.payload)
					state.isLoading = false
				}
			)
			.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
				state.error = action.payload
				state.isLoading = false
			})
	},
})

export const { reducer: articleDetailsCommentsReducer } =
	ArticleDetailsCommentsSlice
