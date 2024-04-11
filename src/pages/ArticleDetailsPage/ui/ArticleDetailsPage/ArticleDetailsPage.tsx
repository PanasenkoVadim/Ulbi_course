import { ArticleDetails } from "entities/Article";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import classNames from "shared/lib/classNames/classNames";
import css from "./ArticleDetailsPage.module.scss";
import { CommentList } from "entities/Comment";
import { Text } from "shared/ui/Text/Text";

type ArticleDetailsPageProps = {
  className?: string;
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  if (!id) return;

  return (
    <div className={classNames(css.articleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text className={css.commentsTitle} title={t("Комментарии")} />
      <CommentList
        comments={[
          {
            id: "1",
            text: "Comment 1",
            user: {
              id: "1",
              username: "admin",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0xOlgRPBlASnuPj0zyXsQ_8bPoXDh-3Eflnz5pHl2T2KUcMttAifJfx30BEScD6bb_c&usqp=CAU",
            },
          },
          {
            id: "2",
            text: "Comment 2",
            user: {
              id: "1",
              username: "admin",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0xOlgRPBlASnuPj0zyXsQ_8bPoXDh-3Eflnz5pHl2T2KUcMttAifJfx30BEScD6bb_c&usqp=CAU",
            },
          },
        ]}
      />
    </div>
  );
};

export default memo(ArticleDetailsPage);
