import { memo } from "react";
import { ArticleCodeBlock } from "../../model/types/article";
import { useTranslation } from "react-i18next";
import classNames from "shared/lib/classNames/classNames";
import { Code } from "shared/ui/Code/Code";

type ArticleCodeBlockComponentProps = {
  className?: string;
  block: ArticleCodeBlock;
};

const ArticleCodeBlockComponent = memo(
  (props: ArticleCodeBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();
    return (
      <div className={classNames("test", {}, [className])}>
        <Code text={block.code} />
      </div>
    );
  }
);

export default ArticleCodeBlockComponent;
