import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { numberFormat, translate } from "../../utils";
import "./style.css";
import useLang from '../../store/use-lang';


function ArticleAbout(props) {
  const callbacks = {
    onClick: (e) => {
      e.stopPropagation();
      props.onAdd(props.article._id);
    },
  };
  const {lang}= useLang();
  const cn = bem("Article");

  return (
    <div className={cn()}>
      <p>{props.article.description}</p>
      <p>
        {translate("article.country",lang)}:{" "}
        <strong>
          {props.article.madeIn?.title} ({props.article.madeIn?.code})
        </strong>
      </p>
      <p>
        {translate("article.year",lang)}
      : <strong>{props.article.edition}</strong>
      </p>
      <p className={cn("price")}>{translate("article.price",lang)}: {numberFormat(props.article.price)} ₽</p>
      <button onClick={callbacks.onClick}>{translate("links.add",lang)}</button>
    </div>
  );
}
ArticleAbout.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleAbout.defaultProps = {
  onAdd: () => {},
};
export default memo(ArticleAbout);
