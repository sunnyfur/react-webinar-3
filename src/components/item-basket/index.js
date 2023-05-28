import {memo} from "react";
import propTypes from "prop-types";
import {numberFormat, translate} from "../../utils";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import "./style.css";
import useLang from '../../store/use-lang';


function ItemBasket(props) {
  const cn = bem("ItemBasket");
  const {lang}= useLang();
  const callbacks = {
    onRemove: (e) => props.onRemove(props.item._id),
    onLink: (e) => props.onLink(props.item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div onClick={callbacks.onLink} className={cn("title")}>
        {props.item.title}
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>{translate("links.delete", lang)}</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onLink: propTypes.func
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onLink: () => {}
}

export default memo(ItemBasket);
