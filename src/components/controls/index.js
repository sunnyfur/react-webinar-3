import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls(props) {
  return (
    <div className='Controls'>
      <div>
        В корзине:{' '}
        <strong>
          {props.totalCount ? (
            <>
              {formatText(
                props.totalCount,
                plural(props.totalCount, {
                  one: 'товар',
                  few: 'товара',
                  many: 'товаров',
                })
              )}{' '}
              / {formatText(props.totalPrice, '₽')}
            </>
          ) : (
            'пусто'
          )}
        </strong>
      </div>
      <button onClick={props.onCartOpen}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  totalCount: PropTypes.number,
  totalPrice: PropTypes.number,
  onCartOpen: PropTypes.func,
};

Controls.defaultProps = {
  onCartOpen: () => {},
};

export default memo(Controls);
