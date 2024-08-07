import { combineReducers } from "@reduxjs/toolkit";
import { articleDetailsCommentsReducer } from "./ArticleDetailsCommentsSlice";
import { articleDetailsPageRecommendationsReducer } from "./ArticleDetailsPageRecommendationsSlice";

export const articleDetailsPageReducer = combineReducers({
  recommendations: articleDetailsPageRecommendationsReducer,
  comments: articleDetailsCommentsReducer,
});
