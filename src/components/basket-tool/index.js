import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, plural, translate} from "../../utils";
import './style.css';
import { NavLink } from 'react-router-dom';
import useLang from '../../store/use-lang';

function BasketTool({sum, amount, onOpen}) {
  const cn = bem('BasketTool');
  const {lang}= useLang();
  return (
    <div className={cn()}>
      <span className={cn("label")}> {translate("main.inBasket",lang)}:</span>
      <span className={cn("total")}>
        {amount
          ? `${amount} ${plural(amount,translate("productPlural",lang))} / ${numberFormat(sum)} ₽`
          : translate("main.empty",lang)
        }
      </span>
      <button onClick={onOpen}> {translate("links.open",lang)}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => {},
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
