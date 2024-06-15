import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Comment } from "entities/Comment";
import { getUserAuthData } from "entities/user";
import i18n from "shared/config/i18n/i18n";
import { getArticleDetailsData } from "entities/Article";
import { fetchCommentsByArticleId } from "../fetchCommentsByArticleId/fetchCommentsByArticleId";

export const addArticleComment = createAsyncThunk<Comment, string, ThunkConfig<string>>(
  "addCommentForm/addArticleComment",
  async (text, { extra, dispatch, rejectWithValue, getState }) => {
    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());
    if (!userData || !text || !article) {
      return rejectWithValue("empty data");
    }

    try {
      const responce = await extra.api.post<Comment>("/comments", {
        articleId: article.id,
        userId: userData.id,
        text,
      });

      if (!responce.data) {
        throw new Error();
      }
      dispatch(fetchCommentsByArticleId(article.id))
      return responce.data;
    } catch (error) {
      return rejectWithValue(i18n.t("Неверный логин или пароль"));
    }
  }
);
