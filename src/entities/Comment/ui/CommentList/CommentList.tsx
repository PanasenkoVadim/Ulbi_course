import { memo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDIspatch";
import { Text } from "shared/ui/Text/Text";
import { Comment } from "../../model/types/comment";
import { CommentCard } from "../CommentCard/CommentCard";
import css from "./CommentList.module.scss";

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
  const { className, comments, isLoading } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <div className={classNames(css.commentList, {}, [className])}>
      {comments?.length ? (
        comments.map((comment, key) => (
          <CommentCard className={css.comment} key={key} comment={comment} isLoading={isLoading} />
        ))
      ) : (
        <Text text={t("Комментарии отсутствуют")} />
      )}
    </div>
  );
});
