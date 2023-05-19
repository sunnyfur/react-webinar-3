import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatText, plural } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAction: (e) => {
      e.stopPropagation();
      props.onAction(props.item.code);
    },
  };

  return (
    <div className={"Item"}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-information">
        <p>{formatText(props.item.price, "₽")}</p>
        {props.item.count && <p>{formatText(props.item.count, "шт")}</p>}
      </div>
      <div className="Item-actions">
        <button onClick={callbacks.onAction}>{props.actionTitle}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onAction: PropTypes.func,
  actionTitle: PropTypes.string,
};

Item.defaultProps = {
  onAction: () => {},
  actionTitle: "",
};

export default React.memo(Item);
