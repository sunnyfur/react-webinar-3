import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {numberFormat, translate} from "../../utils";
import './style.css';
import useLang from '../../store/use-lang';

function BasketTotal({sum}) {
  const cn = bem('BasketTotal');
  const {lang}= useLang();
  return (
    <div className={cn()}>
      <span className={cn('cell')}>{translate("basket.total",lang)}</span>
      <span className={cn('cell')}> {numberFormat(sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: PropTypes.number
};

BasketTotal.defaultProps = {
  sum: 0
}

export default memo(BasketTotal);
