import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import classNames from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDIspatch";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import {
  getAddCommentFormError,
  getAddCommentFormText,
} from "../../model/selectors/addCommentFormSelectors";

import {
  addCommentFormActions,
  addCommentFormReducer,
} from "../../model/slice/addCommentFormSlice";
import css from "./AddCommentForm.module.scss";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}
const initialReducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const commentText = useSelector(getAddCommentFormText);
    const error = useSelector(getAddCommentFormError);

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setCommentText(value));
      },
      [dispatch]
    );
    const onSendHandler = useCallback(() => {
      onSendComment(commentText || "");
      onCommentTextChange("");
    }, [onSendComment, onCommentTextChange, commentText]);

    return (
      <DynamicModuleLoader reducers={initialReducers}>
        <form className={classNames(css.addCommentForm, {}, [className])}>
          <Input
            value={commentText}
            onChange={onCommentTextChange}
            type="text"
            placeholder={t("Введите текст комментария")}
          />
          <Button
            onClick={onSendHandler}
            className={css.form_btn}
            disabled={!commentText}
            theme={ButtonTheme.OUTLINE}
          >
            {t("Отправить")}
          </Button>
        </form>
      </DynamicModuleLoader>
    );
  }
);

export default AddCommentForm;
