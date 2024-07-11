import { memo } from "react";
import { useTranslation } from "react-i18next";
import classNames from "shared/lib/classNames/classNames";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDIspatch";
import { articleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import css from "./ArticleListItem.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Link } from "react-router-dom";
import { Icon } from "shared/ui/Icon/Icon";
import Eye from "shared/static/images/eye.svg";
import { Text, TextSize } from "shared/ui/Text/Text";

type ArticleListItemProps = {
  className?: string;
  article: Article;
  view: ArticleView;
};

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const { className, article, view } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  console.log(article.user);
  if (view === ArticleView.TILES) {
    return (
      <div className={classNames(css.item, {}, [className, css[view]])}>
        <Link to={RoutePath.article_details + article.id}>
          <div className={css.image}>
            <img src={article.img} alt="" />
            <span className={css.date}>{article.createdAt}</span>
          </div>
          <div className={css.row}>
            <div className={css.type}>{article.type.join(", ")}</div>
            <div className={css.views}>
              {article.views}
              <Icon Svg={Eye} />
            </div>
          </div>
          <div className={css.name}>{article.title}</div>
        </Link>
      </div>
    );
  }

  return (
    <div className={classNames(css.item, {}, [className, css[view]])}>
      <div className={css.user}>
        <img src={article.user.avatar} alt="" />
        <span>{article.user.username}</span>
      </div>
      <div className={css.img}>
        <img src={article.img} alt="" />
      </div>
      <div>{article.type.join(", ")}</div>
      <Link to={RoutePath.article_details + article.id}>
        <Text className={css.title} title={article.title} size={TextSize.L} />
      </Link>
      <div>{article.subtitle}</div>
      <span>{article.createdAt}</span>
    </div>
  );
});
