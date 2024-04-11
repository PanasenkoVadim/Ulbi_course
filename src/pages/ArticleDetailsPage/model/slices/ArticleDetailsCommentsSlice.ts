import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import { ArticleDetailsCommentsSchema } from "../types/ArticleDetailsCommentsSchema";

const commentsAdapter = createEntityAdapter({
  selectId: (comment: Comment) => comment.id,
});

const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
  (state) => state.ArticleDetailsComments || commentsAdapter.getInitialState()
);

const ArticleDetailsComments = createSlice({
  name: "articleDetailsCommentsSlice",
  initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
  }),
  reducers: {},
});

// export const {reducer: articleDetails}